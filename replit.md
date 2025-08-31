# TakeFly - Aerial Photography Portfolio

## Overview

TakeFly is a professional aerial photography and videography portfolio website built as a full-stack React application. The site showcases drone photography work, handles client inquiries through a contact form, and includes basic analytics tracking. It's designed for a Portuguese-speaking market (Rio de Janeiro) and features a dark, cinematic design theme suitable for a visual portfolio.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the main application framework
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management and API interactions
- **Framer Motion** for animations and smooth transitions
- **Tailwind CSS** with custom dark theme for styling
- **shadcn/ui** component library built on Radix UI primitives

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with endpoints for analytics and contact management
- **In-memory storage** implementation using Map data structures (MemStorage class)
- **Zod schemas** for request validation and type safety
- **Session-based tracking** for analytics without authentication

### Database Schema Design
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Analytics table**: Tracks page views with user agent, session ID, and timestamps
- **Contacts table**: Stores form submissions with name, email, phone, service type, and message
- **UUID primary keys** with automatic timestamp generation

### Development and Build Pipeline
- **ESM modules** throughout the codebase
- **TypeScript** with strict configuration for type safety
- **Shared schema** directory for common types between client and server
- **Hot module replacement** in development with Vite
- **Build process**: Vite for client bundling, esbuild for server compilation

### Key Features
- **Portfolio sections**: Hero video, image gallery with filtering, video showcase
- **Contact form**: Multi-field form with service type selection and validation
- **Analytics tracking**: Automatic page view tracking with session management
- **Admin dashboard**: Hidden analytics panel accessible via keyboard shortcut
- **SEO optimization**: Meta tags, structured data, and semantic HTML
- **Responsive design**: Mobile-first approach with Tailwind breakpoints

### Performance Optimizations
- **Lazy loading**: Images and components loaded on demand
- **Animation delays**: Staggered loading screen and section reveals
- **Query caching**: TanStack Query with infinite stale time for static content
- **Code splitting**: Automatic bundling optimization through Vite

## External Dependencies

### Core Technologies
- **Node.js** runtime environment
- **Vite** for build tooling and development server
- **TypeScript** for static type checking

### UI and Styling
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible component primitives
- **Framer Motion** for animation library
- **Lucide React** for icon components

### Database and ORM
- **Neon Database** (serverless PostgreSQL provider)
- **Drizzle ORM** for database operations and migrations
- **PostgreSQL** as the database dialect

### Form Handling and Validation
- **React Hook Form** for form state management
- **Zod** for schema validation
- **@hookform/resolvers** for Zod integration

### Development Tools
- **Replit** platform integration with development banners and cartographer
- **PostCSS** with Autoprefixer for CSS processing
- **ESBuild** for server-side bundling

### Fonts and Assets
- **Google Fonts** integration (Inter, Playfair Display, and others)
- **Unsplash** for placeholder images in portfolio sections
- **External video sources** for background and showcase content