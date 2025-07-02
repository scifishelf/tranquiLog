# tranquiLog

tranquiLOG – The calmest way to manage your Scrum backlog.

Ein funktionsfähiger Prototyp eines Backlog-Tools für Scrum-Teams mit ruhigem und intuitivem Design.

## Tech Stack

**Frontend:**
- React (TypeScript) mit Vite
- Tailwind CSS für Styling
- Zustand für State-Management
- @dnd-kit für Drag & Drop

**Backend:**
- Node.js mit Express
- TypeScript
- In-Memory Datenhaltung

## Installation & Start

### Schnellstart (alles in 2 Befehlen)
```bash
npm install    # Installiert automatisch alle Dependencies (Root + Backend + Frontend)
npm start      # Startet Frontend + Backend gleichzeitig
```

Dies startet gleichzeitig:
- Backend Server auf Port 3001
- Frontend Development Server auf Port 5173

### Alternative Befehle
```bash
npm run dev           # Gleich wie npm start
npm run build         # Frontend Production Build
npm run backend:build # Backend Production Build

# Einzeln starten (für Debugging)
npm run backend:dev   # Nur Backend
npm run frontend:dev  # Nur Frontend  
```

## Funktionen

- ✅ CRUD-API für Tickets (Titel, Beschreibung, Status, Priorität, Labels)
- ✅ Kanban-Board mit Status-Spalten und Ticket-Karten  
- ✅ Ticket-Modal für Erstellen & Bearbeiten
- ✅ Automatische Prioritätsvorschläge basierend auf Labels
- ✅ Epic-Erkennung anhand Titel-Präfix "EPIC:"
- ✅ Vorschläge für leere Beschreibungen
- ✅ Mock-Daten mit 7+ Beispiel-Tickets
- ✅ TypeScript überall mit vollständiger Typisierung
- ✅ Zustand State Management mit Persistierung
- ✅ LocalStorage Utility für Offline-Fallback
- ✅ Express Backend with In-Memory Store
- ✅ Responsive Design mit Tailwind CSS

## API Endpoints

- `GET /api/tickets` - Alle Tickets abrufen
- `GET /api/tickets/:id` - Ticket nach ID
- `POST /api/tickets` - Neues Ticket erstellen
- `PUT /api/tickets/:id` - Ticket aktualisieren  
- `DELETE /api/tickets/:id` - Ticket löschen
- `GET /api/tickets/status/:status` - Tickets nach Status filtern
- `GET /api/labels` - Alle Labels abrufen
- `POST /api/labels` - Neues Label erstellen

## Entwicklung

Die Anwendung läuft lokal mit:
- **Backend:** Express Server auf `http://localhost:3001`
- **Frontend:** Vite Dev Server auf `http://localhost:5173`  
- **Health Check:** `http://localhost:3001/health` 