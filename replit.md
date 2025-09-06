# Overview

This is a full-stack web application built with React (frontend) and Express (backend), featuring a portfolio website as the main interface. The application uses TypeScript throughout and follows modern development practices with a monorepo structure that includes shared types and schemas between client and server.

The project is configured as a REST API application with Express.js serving both API endpoints and static React content. It includes comprehensive UI components from shadcn/ui, database integration with Drizzle ORM, and is set up for deployment with proper build processes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Complete shadcn/ui component system with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation resolvers

The frontend follows a component-based architecture with reusable UI components in the `/components/ui` directory. The application uses a custom design system with consistent theming through CSS variables and Tailwind configuration.

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES modules throughout the application
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Request Processing**: JSON body parsing and URL-encoded form support
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Logging**: Custom request/response logging for API endpoints

The server implements a clean separation between routes, storage layer, and business logic. The storage interface allows for easy swapping between different persistence implementations.

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured but can work with Neon serverless)
- **Schema Management**: Type-safe database schemas with Zod validation
- **Migrations**: Drizzle migrations in `/migrations` directory
- **Connection**: Uses DATABASE_URL environment variable for connection string

The application includes both in-memory storage (for development/testing) and database storage implementations, providing flexibility in different environments.

## Development Tools
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Type Checking**: Strict TypeScript configuration across client, server, and shared code
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Code Quality**: Proper import/export patterns with path aliases for clean code organization

The build process creates optimized bundles for production deployment, with the frontend compiled to static assets and the backend bundled for Node.js execution.

## Authentication & Sessions
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **Security**: Prepared for cookie-based session authentication
- **User Management**: User schema with username/password authentication structure

While basic user management is set up, the authentication implementation can be extended based on specific requirements.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Connection Pooling**: Built-in connection management for serverless environments

## UI and Styling
- **Radix UI**: Complete primitive component library for accessible UI components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for typography

## Development and Build Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript bundler for backend compilation
- **tsx**: TypeScript execution for development
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

## Form and Data Management
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **TanStack Query**: Server state management and caching
- **date-fns**: Date manipulation utilities

## Additional Libraries
- **clsx & class-variance-authority**: Conditional CSS class utilities
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **wouter**: Lightweight React routing
- **nanoid**: Unique ID generation

The application is designed to be easily deployable on platforms like Replit, Vercel, or similar services with minimal configuration changes.