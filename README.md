# CaringIQ - Professional Landing Page

A modern, responsive landing page for CaringIQ, a caregiving intelligence platform that helps families coordinate care for elderly parents with AI assistance.

## Features

- **Modern React Frontend**: Built with React 18, TypeScript, and Vite
- **Professional Design**: Responsive landing page using Tailwind CSS and shadcn/ui components
- **Functional Forms**: Waitlist signup and contact forms with validation
- **Express Backend**: RESTful API with in-memory storage
- **Form Validation**: Zod schemas for client and server-side validation
- **Smooth Navigation**: Responsive navbar with smooth scrolling

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- Wouter for routing
- TanStack React Query for state management
- React Hook Form with Zod validation

### Backend
- Express.js with TypeScript
- In-memory storage (MemStorage)
- Zod for request validation
- RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd caring-iq-landing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database abstraction layer
│   └── vite.ts            # Vite development server integration
├── shared/                # Shared code between frontend and backend
│   └── schema.ts          # Database schema and validation
└── migrations/            # Database migration files
```

## API Endpoints

- `POST /api/waitlist` - Join the waitlist (name, email)
- `POST /api/contact` - Send contact message (name, email, reason)
- `GET /api/waitlist` - Get all waitlist signups (admin)
- `GET /api/contact` - Get all contact messages (admin)

## Key Components

### Landing Page Sections
- Hero section with compelling messaging
- Features overview with Cari AI assistant
- Comparison table (CaringIQ vs ChatGPT)
- Market statistics and testimonials
- Care circle explanation
- Waitlist and contact forms

### Forms
- **Waitlist Form**: Collects name and email with duplicate prevention
- **Contact Form**: Captures name, email, and reason for reaching out
- Both forms include validation and toast notifications

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Variables
- `NODE_ENV` - Set to 'development' for development mode
- `DATABASE_URL` - PostgreSQL connection string (for production)

## Deployment

The application is designed to be deployed on platforms like Vercel, Netlify, or any Node.js hosting service. The build process creates optimized static files for the frontend and a bundled server for the backend.

## License

MIT License