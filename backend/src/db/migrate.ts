import fs from 'fs';
import path from 'path';
import { query, checkConnection } from './connection';
import logger from '../utils/logger';

interface Migration {
  id: number;
  name: string;
  executed_at: Date;
}

/**
 * Create migrations table if it doesn't exist
 */
async function createMigrationsTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await query(sql);
  logger.info('Migrations table ready');
}

/**
 * Get list of executed migrations
 */
async function getExecutedMigrations(): Promise<string[]> {
  const result = await query<Migration>('SELECT name FROM migrations ORDER BY id');
  return result.rows.map((row) => row.name);
}

/**
 * Get list of migration files
 */
function getMigrationFiles(): string[] {
  const migrationsDir = path.join(__dirname, 'migrations');
  
  // Create migrations directory if it doesn't exist
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    logger.info('Created migrations directory');
    return [];
  }

  const files = fs.readdirSync(migrationsDir);
  return files
    .filter((file) => file.endsWith('.sql'))
    .sort();
}

/**
 * Execute a migration file
 */
async function executeMigration(filename: string): Promise<void> {
  const migrationsDir = path.join(__dirname, 'migrations');
  const filepath = path.join(migrationsDir, filename);
  const sql = fs.readFileSync(filepath, 'utf-8');

  try {
    // Execute migration in a transaction
    await query('BEGIN');
    await query(sql);
    await query('INSERT INTO migrations (name) VALUES ($1)', [filename]);
    await query('COMMIT');
    logger.info(`Migration executed: ${filename}`);
  } catch (error) {
    await query('ROLLBACK');
    logger.error(`Migration failed: ${filename}`, error);
    throw error;
  }
}

/**
 * Run all pending migrations
 */
export async function runMigrations(): Promise<void> {
  try {
    // Check database connection
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Create migrations table
    await createMigrationsTable();

    // Get executed and pending migrations
    const executedMigrations = await getExecutedMigrations();
    const migrationFiles = getMigrationFiles();
    const pendingMigrations = migrationFiles.filter(
      (file) => !executedMigrations.includes(file)
    );

    if (pendingMigrations.length === 0) {
      logger.info('No pending migrations');
      return;
    }

    logger.info(`Found ${pendingMigrations.length} pending migrations`);

    // Execute pending migrations
    for (const migration of pendingMigrations) {
      await executeMigration(migration);
    }

    logger.info('All migrations completed successfully');
  } catch (error) {
    logger.error('Migration process failed', error);
    throw error;
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      logger.info('Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration process failed', error);
      process.exit(1);
    });
}
