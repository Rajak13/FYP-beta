# Elevare - Collaborative Learning Platform

**Version:** 1.0.0  
**Status:** In Development  
**Project Type:** Final Year Project

---

## Overview

Elevare is a comprehensive collaborative learning platform built with a traditional three-tier architecture. Unlike StudyCollab (which uses Supabase), Elevare demonstrates full-stack development skills with a custom Node.js + Express backend and PostgreSQL database.

## Features

- **User Authentication**: Secure registration, login, and profile management
- **Task Management**: Create, organize, and track academic tasks with deadlines
- **Note-Taking**: Rich text editor with folders, tags, and AI-powered summarization
- **Study Groups**: Collaborative spaces with real-time chat and resource sharing
- **Resource Sharing**: Upload, discover, and rate educational materials
- **File Management**: Organize and share files with folder structure
- **Video Conferencing**: Real-time video calls with screen sharing
- **Collaborative Whiteboard**: Draw and diagram together in real-time
- **Universal Search**: Search across all content types
- **Dashboard**: Personalized dashboard with productivity analytics
- **Notifications**: Real-time notifications for deadlines and activities

## Technology Stack

### Frontend
- Next.js 14+ (App Router)
- React 18+
- TypeScript 5+
- Tailwind CSS
- React Query (TanStack Query)
- Socket.io Client
- WebRTC API

### Backend
- Node.js 18+
- Express.js 4+
- Socket.io Server
- JWT Authentication
- bcryptjs
- Multer (file uploads)
- express-validator

### Database
- PostgreSQL 15+
- pg (node-postgres)
- Database migrations

### AI Integration
- Hugging Face Transformers.js
- facebook/bart-large-cnn model

## Project Structure

```
Elevare/
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Data models
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utility functions
│   │   ├── websocket/   # WebSocket handlers
│   │   └── app.ts       # Express app
│   ├── migrations/      # Database migrations
│   ├── tests/           # Backend tests
│   ├── .env.example     # Environment template
│   └── README.md
│
├── frontend/            # Next.js frontend
│   ├── src/
│   │   ├── app/        # Next.js pages
│   │   ├── components/ # React components
│   │   ├── lib/        # Utility libraries
│   │   ├── hooks/      # Custom hooks
│   │   ├── contexts/   # React contexts
│   │   ├── types/      # TypeScript types
│   │   └── styles/     # Global styles
│   ├── public/         # Static assets
│   ├── .env.example    # Environment template
│   └── README.md
│
├── .git/               # Git repository
├── .gitignore
├── BRANCHING_STRATEGY.md
└── README.md           # This file
```

## Documentation

Comprehensive documentation is available in the `Elevare-docs/` directory (located in parent FYP folder):

- **PROJECT_STRUCTURE.md**: Detailed project organization and conventions
- **THEME_SYSTEM.md**: Theme system documentation (Educational, Nepali Light, Dark)
- **CODING_CONVENTIONS.md**: Code style guide and best practices
- **SRS_DOCUMENT.md**: Software Requirements Specification
- **ER_DIAGRAM.md**: Database schema and entity relationships
- **DATABASE_NORMALIZATION.md**: Database design and normalization process
- **DEVELOPMENT_SETUP.md**: Development environment setup guide

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 15 or higher
- npm or yarn

### Installation

1. **Clone the repository** (already done)
   ```bash
   cd ~/Documents/FYP/Elevare
   ```

2. **Set up PostgreSQL**
   ```bash
   # Create database and user
   psql postgres
   CREATE USER elevare_user WITH PASSWORD 'your_password';
   CREATE DATABASE elevare_db OWNER elevare_user;
   GRANT ALL PRIVILEGES ON DATABASE elevare_db TO elevare_user;
   \c elevare_db
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   \q
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run migrate  # Run database migrations
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local
   ```

### Running the Application

**Development Mode:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health: http://localhost:5000/api/health

## Theme System

Elevare features three themes:

1. **Educational Theme (Default)**
   - Primary: Forest Green (#4A7C59)
   - Warm, nature-inspired colors
   - Ideal for long study sessions

2. **Nepali Light Theme**
   - Primary: Crimson Red (#DC143C)
   - Secondary: Nepal Flag Blue (#003893)
   - Inspired by Nepal's national colors

3. **Enhanced Dark Theme**
   - Adapted Educational colors for dark mode
   - Reduces eye strain in low-light
   - Modern, sleek appearance

## Development Workflow

### Branching Strategy

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/***: New features
- **bugfix/***: Bug fixes
- **hotfix/***: Critical production fixes

### Commit Convention

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(auth): add password reset functionality
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm test

# Type check
npm run type-check
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## Deployment

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm start
```

## Database Schema

The database follows Third Normal Form (3NF) with:
- 25 tables
- 50+ foreign keys
- 100+ indexes
- 30+ constraints
- 20+ triggers

Key tables:
- users, sessions
- tasks, task_categories
- notes, note_folders
- study_groups, group_members, group_messages
- resources, resource_ratings, resource_comments
- files, file_folders, file_shares
- whiteboards, whiteboard_elements
- notifications

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- GET /api/auth/me
- PUT /api/auth/profile

### Tasks
- GET /api/tasks
- POST /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

### Notes
- GET /api/notes
- POST /api/notes
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id
- POST /api/notes/:id/summarize

### Study Groups
- GET /api/groups
- POST /api/groups
- GET /api/groups/:id
- POST /api/groups/:id/join
- POST /api/groups/:id/approve
- GET /api/groups/:id/messages
- POST /api/groups/:id/messages

[See full API documentation for complete endpoint list]

## WebSocket Events

### Chat
- connection, disconnect
- join_room, leave_room
- send_message, message_received
- typing_start, typing_stop

### Whiteboard
- whiteboard_join, whiteboard_leave
- draw_start, draw_move, draw_end
- add_element, update_element, delete_element

### Notifications
- notification, notification_read

## Security Features

- JWT token-based authentication
- bcrypt password hashing (10+ rounds)
- HTTPS/WSS for all communications
- Parameterized SQL queries (SQL injection prevention)
- Input validation and sanitization (XSS prevention)
- Rate limiting (brute force prevention)
- CORS with restricted origins
- Security headers (helmet.js)

## Performance Optimizations

- Database connection pooling
- Strategic indexing (100+ indexes)
- Query optimization
- Caching frequently accessed data
- Horizontal scaling support
- Efficient WebSocket connections
- Optimized bundle sizes

## Contributing

This is a Final Year Project. Contributions are not currently accepted.

## License

This project is for educational purposes as part of a Final Year Project.

## Project Status

**Current Phase:** Phase 1 - Project Setup and Infrastructure ✅

**Completed:**
- ✅ Git repository initialization
- ✅ Documentation structure
- ✅ SRS document
- ✅ ER diagram and database schema
- ✅ Database normalization documentation
- ✅ Environment configuration
- ✅ Development setup guide

**Next Phase:** Phase 2 - Project Initialization and Landing Page

## Contact

**Developer:** Rajak  
**Project:** Final Year Project  
**Institution:** [Your University]  
**Year:** 2025

---

**Last Updated:** November 26, 2025
