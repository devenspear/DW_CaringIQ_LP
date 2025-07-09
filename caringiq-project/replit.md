# replit.md

## Overview

This is a modern full-stack web application built with React + TypeScript frontend and Express.js backend. The application appears to be a landing page for CaringIQ, a caregiving intelligence platform that helps families coordinate care for elderly parents. The app features waitlist signup and contact form functionality, with a modern UI built using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with TypeScript support
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Driver**: Neon Database serverless
- **Validation**: Zod schemas for request validation
- **Session Management**: Express sessions with PostgreSQL store

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database abstraction layer
│   └── vite.ts       # Vite development server integration
├── shared/           # Shared code between frontend and backend
│   └── schema.ts     # Database schema and validation
└── migrations/       # Database migration files
```

## Key Components

### Database Schema
- **Users**: Basic user authentication table
- **Waitlist Signups**: Captures name and email for product waitlist
- **Contact Messages**: Stores contact form submissions with reason field

### API Endpoints
- `POST /api/waitlist` - Waitlist signup with duplicate email prevention
- `POST /api/contact` - Contact form submission
- `GET /api/waitlist` - Retrieve waitlist signups (admin/testing)
- `GET /api/contact` - Retrieve contact messages (admin/testing)

### Storage Layer
- Abstract `IStorage` interface for database operations
- `MemStorage` implementation for in-memory storage (development/testing)
- Drizzle ORM integration for PostgreSQL production database

### Frontend Features
- Responsive landing page with modern UI
- Waitlist signup form with email validation
- Contact form with reason selection
- Toast notifications for user feedback
- Mobile-responsive design

## Data Flow

1. **User Interaction**: Users fill out waitlist or contact forms
2. **Client Validation**: React Hook Form + Zod validates input
3. **API Request**: TanStack Query sends validated data to backend
4. **Server Validation**: Express routes re-validate using shared Zod schemas
5. **Database Storage**: Storage layer persists data to PostgreSQL
6. **Response**: Success/error feedback displayed via toast notifications

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- TanStack React Query for server state
- Radix UI primitives for accessible components
- Tailwind CSS + shadcn/ui for styling
- Wouter for routing
- Zod for validation

### Backend Dependencies
- Express.js for HTTP server
- Drizzle ORM for database operations
- Neon Database serverless driver
- connect-pg-simple for session storage
- Zod for request validation

### Development Dependencies
- Vite for frontend build and development
- TypeScript for type safety
- ESBuild for backend bundling
- Tailwind CSS for styling

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Express server with TypeScript compilation via tsx
- Database migrations using Drizzle Kit
- Shared TypeScript configuration for consistent types

### Production Build
- Frontend: Vite builds to `dist/public/`
- Backend: ESBuild bundles server to `dist/index.js`
- Database: PostgreSQL via Neon serverless
- Environment: DATABASE_URL required for production

### Database Management
- Drizzle migrations stored in `./migrations/`
- Schema definitions in `shared/schema.ts`
- Push migrations with `npm run db:push`
- PostgreSQL dialect configured for production

The application is designed as a modern, type-safe full-stack solution with clear separation of concerns between frontend and backend, shared validation schemas, and a scalable database architecture.