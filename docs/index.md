# tranquiLog Documentation

*AI-optimized documentation - Last updated: 02. Juli 2025*

## 📚 Documentation Index

### Core Documentation
- **[Features](./features.md)** - Complete feature overview with implementation status
- **[API](./api.md)** - REST API endpoints, models, and responses
- **[Components](./components.md)** - Frontend React component structure
- **[Architecture](./architecture.md)** - System architecture and tech stack
- **[Types](./types.md)** - TypeScript interfaces and type definitions
- **[Development](./development.md)** - Setup, scripts, and development workflow

## 🎯 Quick References

### Ports
- Frontend: `5173`
- Backend: `3001`

### Key Files
- Frontend entry: `frontend/src/App.tsx`
- Backend entry: `backend/src/index.ts`
- Store: `frontend/src/store/useTicketStore.ts`
- API client: `frontend/src/utils/api.ts`

### Core Types
- `Ticket` - Main data model
- `Label` - Tag system
- `TicketStatus` - 'todo' | 'in-progress' | 'done'
- `TicketPriority` - 'low' | 'medium' | 'high'

### Smart Features
- Epic detection (EPIC: prefix)
- Priority auto-suggestions
- Drag & drop status updates
- LocalStorage persistence

---

*This documentation is optimized for AI comprehension and rapid feature development.* 