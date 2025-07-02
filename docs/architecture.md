# System Architecture

*Last updated: 02. Juli 2025*

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Zustand (state management)
- @dnd-kit (drag & drop)
- Tailwind CSS (styling)

### Backend
- Node.js + Express
- TypeScript
- In-memory storage (DataStore class)

## Project Structure
```
/backend/
  /src/
    /controllers/    - Business logic
    /routes/        - API routes
    /models/        - Data models
    /utils/         - Helper functions
    /types/         - TypeScript types

/frontend/
  /src/
    /components/    - React components
    /store/         - Zustand stores
    /utils/         - Helper functions
    /types/         - TypeScript types
```

## Data Flow

1. Frontend → API calls via `utils/api.ts`
2. Backend → Controllers handle business logic
3. Backend → DataStore manages in-memory data
4. Frontend → Zustand store manages UI state
5. Frontend → LocalStorage as offline fallback

## Port Configuration
- Backend: `3001`
- Frontend: `5173`
- Proxy: Frontend proxies `/api/*` to backend

## State Management
- Zustand store (`useTicketStore`)
- Persistent via localStorage
- Auto-sync with backend API 