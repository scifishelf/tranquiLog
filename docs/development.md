# Development Setup

*Last updated: 02. Juli 2025 - Scripts vereinfacht*

## Quick Start
```bash
npm install    # Installs everything automatically via postinstall hook
npm start      # Starts both frontend + backend
```

## Scripts

### Root Level (Simplified)
- `npm install` - **Installs ALL dependencies automatically** (Root + Backend + Frontend)
- `npm start` - **Start both frontend + backend** (main command)
- `npm run dev` - Start both frontend + backend (alias for npm start)
- `npm run build` - Build frontend for production
- `npm run backend:build` - Build backend for production

### Individual Services (For Debugging)
- `npm run backend:dev` - Start backend only
- `npm run frontend:dev` - Start frontend only

### Backend Scripts
- `npm run dev` - Start with tsx watch
- `npm run build` - Compile TypeScript
- `npm run start` - Start production build
- `npm run lint` - ESLint check
- `npm run lint:fix` - ESLint auto-fix
- `npm run format` - Prettier format

### Frontend Scripts
- `npm run dev` - Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - ESLint check
- `npm run lint:fix` - ESLint auto-fix
- `npm run format` - Prettier format

## Development URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- Health Check: `http://localhost:3001/health`
- API Docs: `http://localhost:3001/api`

## File Watching
- Backend: tsx watch (auto-restart on changes)
- Frontend: Vite HMR (hot module replacement)

## Debugging
- TypeScript errors shown in console
- Network requests visible in browser dev tools
- Backend logs to console with emojis
- ESLint/Prettier configured for both projects

## Environment
- Node.js required
- No external database needed
- In-memory storage resets on restart
- CORS enabled for local development 