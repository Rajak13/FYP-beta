# Elevare Frontend

## Overview

The Elevare frontend is a Next.js application that provides the user interface for the Elevare collaborative learning platform.

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Real-time**: Socket.io Client
- **Video**: WebRTC API
- **Forms**: React Hook Form
- **Validation**: Zod

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── dashboard/      # Dashboard page
│   │   ├── tasks/          # Task management pages
│   │   ├── notes/          # Note-taking pages
│   │   ├── groups/         # Study groups pages
│   │   ├── resources/      # Resource sharing pages
│   │   ├── files/          # File management pages
│   │   ├── whiteboard/     # Whiteboard pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── tasks/         # Task components
│   │   ├── notes/         # Note components
│   │   ├── groups/        # Group components
│   │   ├── resources/     # Resource components
│   │   ├── files/         # File components
│   │   ├── whiteboard/    # Whiteboard components
│   │   ├── ui/            # Reusable UI components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utility libraries
│   │   ├── api.ts         # API client
│   │   ├── auth.ts        # Authentication utilities
│   │   ├── websocket.ts   # WebSocket client
│   │   └── utils.ts       # General utilities
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React contexts
│   ├── types/             # TypeScript types
│   └── styles/            # Global styles
├── public/                # Static assets
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

See `.env.example` for required environment variables:

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:5000)
- `NEXT_PUBLIC_WS_URL`: WebSocket server URL (default: ws://localhost:5000)

## Theme System

Elevare supports three themes that can be switched by users:

### 1. Educational Theme (Default)
- **Primary Color**: Forest Green (#4A7C59 / hsl(142 71% 45%))
- **Secondary Color**: Soft Blue (#5B9BD5)
- **Accent**: Warm Orange (#F4A261)
- **Background**: Light Cream (#FAF9F6)
- **Use Case**: Default theme with warm, educational colors

### 2. Nepali Light Theme
- **Primary Color**: Crimson Red (#DC143C / hsl(348 83% 47%))
- **Secondary Color**: Nepal Flag Blue (#003893 / hsl(220 91% 15%))
- **Accent**: Golden Yellow (#FFD700)
- **Background**: White (#FFFFFF)
- **Use Case**: Inspired by Nepal's national colors

### 3. Enhanced Dark Theme
- **Primary Color**: Adapted Forest Green (lighter for dark mode)
- **Secondary Color**: Adapted Soft Blue (lighter for dark mode)
- **Background**: Dark Gray (#1A1A1A)
- **Text**: Light Gray (#E5E5E5)
- **Use Case**: Dark mode variant of Educational theme

### Theme Implementation

Themes are implemented using CSS variables and Tailwind CSS:

```css
/* globals.css */
:root {
  --color-primary: 142 71% 45%;
  --color-secondary: 210 100% 60%;
  /* ... */
}

[data-theme="nepali-light"] {
  --color-primary: 348 83% 47%;
  --color-secondary: 220 91% 15%;
  /* ... */
}

[data-theme="dark"] {
  --color-primary: 142 71% 55%;
  --color-background: 0 0% 10%;
  /* ... */
}
```

Users can switch themes using the theme selector in the settings or navigation bar.

## Features

- **Authentication**: Login, registration, password reset
- **Dashboard**: Personalized dashboard with widgets
- **Task Management**: Create, organize, and track tasks
- **Note-Taking**: Rich text editor with folders and tags
- **Study Groups**: Collaborate with peers
- **Resource Sharing**: Upload and share study materials
- **File Management**: Organize and share files
- **Video Conferencing**: Real-time video calls with screen sharing
- **Collaborative Whiteboard**: Draw and diagram together
- **Search**: Universal search across all content
- **Notifications**: Real-time notifications

## Development

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Use Tailwind CSS for styling
- Write meaningful commit messages

### Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Use React Query for data fetching

### Testing

Run tests:
```bash
npm test
```

Run E2E tests:
```bash
npm run test:e2e
```

## Building for Production

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## License

This project is part of a Final Year Project and is for educational purposes.
