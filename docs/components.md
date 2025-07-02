# Frontend Components

*Last updated: 02. Juli 2025*

## Component Structure

### Board
- `KanbanBoard.tsx` - Main board with 3 columns (Todo, In Progress, Done)
- Drag & Drop via @dnd-kit
- Auto-updates ticket status on column drop

### Modal
- `TicketModal.tsx` - Create/Edit ticket modal
- Form validation
- Auto-priority suggestions based on labels
- Epic detection (EPIC: prefix)

### UI Components
- `Header.tsx` - App header with title
- `ErrorAlert.tsx` - Error message display
- `LoadingSpinner.tsx` - Loading indicator

### App Structure
```
App.tsx
├── Header
├── ErrorAlert (conditional)
├── LoadingSpinner (conditional)
├── KanbanBoard
└── TicketModal (conditional)
```

## Key Props

### KanbanBoard
- No props (uses Zustand store)

### TicketModal
```typescript
{
  isOpen: boolean
  onClose: () => void
  ticketToEdit?: Ticket | null
}
```

### ErrorAlert
```typescript
{
  message: string
  onClose: () => void
}
```

## Styling
- Tailwind CSS throughout
- Responsive design
- Dark/light theme ready (classes defined) 