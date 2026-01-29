# AccesDirectAide

## Overview

AccesDirectAide is a French SaaS platform serving as a one-stop portal for citizens to find and understand available social aid (financial, housing, health), complete administrative procedures with simplified guidance, and connect with professionals or associations for appointments and document sharing. The platform emphasizes clarity, accessibility, and trustworthiness with all information linked to official sources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled with Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom glassmorphism design system (transparent effects, blur, modern aesthetics)
- **Theme**: Light/dark mode support with CSS variables, blue/green/white color palette
- **Design Approach**: Mobile-first, responsive, accessibility-focused with screen reader compatibility

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Build System**: Custom build script using esbuild for server bundling and Vite for client

### Authentication System
- **Provider**: Replit Auth integration using OpenID Connect (OIDC)
- **Session Management**: Express sessions stored in PostgreSQL via `connect-pg-simple`
- **User Roles**: Four role types - `particulier` (citizen), `professionnel` (individual professional), `structure` (organization), `admin`

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Validation**: Zod schemas with drizzle-zod integration
- **Key Entities**: User profiles, appointments, documents, messages, help categories, help articles

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  replit_integrations/auth/  # Authentication logic
shared/           # Shared types and schemas
  schema.ts       # Database schema definitions
  models/         # Data models (auth)
```

### Key Routes
- `/` - Landing page with glassmorphism hero section
- `/connexion` - Login page with Replit Auth integration
- `/inscription` - Signup page with account type selector (Particulier/Professionnel/Structure)
- `/aides` - Catalogue of available social aids
- `/aides/:id` - Aide detail page with eligibility criteria and documents
- `/professionnels` - Directory of social workers and professionals
- `/rendez-vous/nouveau` - Appointment booking flow (3-step process)
- `/dashboard` - User dashboard (authenticated)
- `/secret-admin-panel-2026` - Admin panel (credentials: Admin26/Azerty2026)

### Design System
- **Glassmorphism**: Custom `.glass-premium`, `.glass-card`, `.glass-strong` classes with backdrop blur and transparency
- **Animations**: `animate-fade-in`, `animate-slide-up`, `animate-scale-in`, `floatSlow`, `pulseSoft` for smooth UI transitions
- **Card Hover Effects**: Use `hover:-translate-y-1 hover:shadow-lg` for lift effect (NO hover:scale on buttons)
- **Button Sizing**: Always use `size="lg"` variant instead of explicit h-* classes
- **Important**: Buttons must NOT have custom hover/active scale animations - rely on built-in shadcn elevate utilities

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Session Storage**: PostgreSQL table `sessions` for session persistence

### Authentication
- **Replit Auth**: OIDC-based authentication via Replit's identity provider
- **Required Environment Variables**: `DATABASE_URL`, `SESSION_SECRET`, `ISSUER_URL`, `REPL_ID`

### Third-Party Services (Bundled for Production)
- Passport.js for authentication middleware
- Express session management with PostgreSQL store

### UI Dependencies
- Full shadcn/ui component set (accordion, dialog, dropdown, forms, etc.)
- Radix UI primitives for accessible components
- Lucide React and react-icons for iconography
- Embla Carousel, react-day-picker for specialized UI needs