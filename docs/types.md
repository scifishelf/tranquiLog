# TypeScript Types

*Last updated: 02. Juli 2025*

## Core Types (Shared)

### Ticket
```typescript
interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  labels: string[]
  createdAt: string
  updatedAt: string
}
```

### Label
```typescript
interface Label {
  id: string
  name: string
  color: string
  createdAt: string
}
```

### Enums
```typescript
type TicketStatus = 'todo' | 'in-progress' | 'done'
type TicketPriority = 'low' | 'medium' | 'high'
```

## Frontend-Specific Types

### Store State
```typescript
interface TicketStore {
  tickets: Ticket[]
  labels: Label[]
  loading: boolean
  error: string | null
  // Actions
  fetchTickets: () => Promise<void>
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>
  deleteTicket: (id: string) => Promise<void>
  // ... more actions
}
```

### API Response
```typescript
interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}
```

## Backend-Specific Types

### Controllers
```typescript
interface TicketController {
  getAllTickets: (req: Request, res: Response) => Promise<void>
  getTicketById: (req: Request, res: Response) => Promise<void>
  createTicket: (req: Request, res: Response) => Promise<void>
  updateTicket: (req: Request, res: Response) => Promise<void>
  deleteTicket: (req: Request, res: Response) => Promise<void>
  getTicketsByStatus: (req: Request, res: Response) => Promise<void>
}
``` 