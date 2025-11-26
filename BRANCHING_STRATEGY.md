# Git Branching Strategy

## Branch Structure

### Main Branches

- **main**: Production-ready code. All releases are tagged from this branch.
- **develop**: Integration branch for features. Contains the latest development changes.

### Supporting Branches

- **feature/***: Feature branches for new functionality
  - Branch from: `develop`
  - Merge back to: `develop`
  - Naming: `feature/task-management`, `feature/video-conferencing`

- **bugfix/***: Bug fix branches for non-critical issues
  - Branch from: `develop`
  - Merge back to: `develop`
  - Naming: `bugfix/fix-login-validation`

- **hotfix/***: Critical bug fixes for production
  - Branch from: `main`
  - Merge back to: `main` and `develop`
  - Naming: `hotfix/security-patch`

- **release/***: Release preparation branches
  - Branch from: `develop`
  - Merge back to: `main` and `develop`
  - Naming: `release/v1.0.0`

## Workflow

1. **Starting a new feature**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/feature-name
   ```

2. **Completing a feature**:
   ```bash
   git checkout develop
   git merge --no-ff feature/feature-name
   git branch -d feature/feature-name
   git push origin develop
   ```

3. **Creating a release**:
   ```bash
   git checkout develop
   git checkout -b release/v1.0.0
   # Make final adjustments, update version numbers
   git checkout main
   git merge --no-ff release/v1.0.0
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git checkout develop
   git merge --no-ff release/v1.0.0
   git branch -d release/v1.0.0
   ```

4. **Hotfix workflow**:
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Make the fix
   git checkout main
   git merge --no-ff hotfix/critical-fix
   git tag -a v1.0.1 -m "Hotfix version 1.0.1"
   git checkout develop
   git merge --no-ff hotfix/critical-fix
   git branch -d hotfix/critical-fix
   ```

## Commit Message Convention

Use conventional commit format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add user authentication endpoint`
