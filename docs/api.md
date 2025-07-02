# API Documentation

*Last updated: 02. Juli 2025*

## Base URL
- Development: `http://localhost:3001`

## Endpoints

### Health Check
```
GET /health
Response: { status: "OK", timestamp: string, uptime: number, environment: string }
```

### Tickets
```
GET    /api/tickets              - Get all tickets
GET    /api/tickets/:id          - Get ticket by ID
POST   /api/tickets              - Create new ticket
PUT    /api/tickets/:id          - Update ticket
DELETE /api/tickets/:id          - Delete ticket
GET    /api/tickets/status/:status - Filter by status
```

### Labels
```
GET    /api/labels               - Get all labels
POST   /api/labels               - Create new label
```

## Request/Response Models

### Ticket
```typescript
{
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  labels: string[]
  createdAt: string
  updatedAt: string
}
```

### Label
```typescript
{
  id: string
  name: string
  color: string
  createdAt: string
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error 