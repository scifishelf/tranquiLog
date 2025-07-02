import { Ticket, Label, TicketStatus, TicketPriority } from '../types/index.js';

/**
 * In-Memory Datenstore für Tickets und Labels
 */
class DataStore {
  private tickets: Map<string, Ticket> = new Map();
  private labels: Map<string, Label> = new Map();
  private nextTicketId = 1;
  private nextLabelId = 1;

  constructor() {
    this.initializeMockData();
  }

  /**
   * Initialisiert den Store mit Beispiel-Daten
   */
  private initializeMockData(): void {
    // Labels erstellen
    const mockLabels: Label[] = [
      { id: 'l1', name: 'Frontend', color: '#3B82F6' },
      { id: 'l2', name: 'Backend', color: '#10B981' },
      { id: 'l3', name: 'Bug', color: '#EF4444' },
      { id: 'l4', name: 'Feature', color: '#8B5CF6' },
      { id: 'l5', name: 'Documentation', color: '#F59E0B' },
      { id: 'l6', name: 'Testing', color: '#6B7280' },
    ];

    mockLabels.forEach((label) => {
      this.labels.set(label.id, label);
    });

    // Tickets erstellen
    const mockTickets: Omit<Ticket, 'id'>[] = [
      {
        title: 'EPIC: User Authentication System',
        description: 'Implementiere ein vollständiges Authentifizierungssystem mit Login, Registration und Passwort-Reset.',
        status: 'backlog',
        priority: 'high',
        labels: [mockLabels[1]!, mockLabels[3]!], // Backend, Feature
        isEpic: true,
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString(),
      },
      {
        title: 'Responsive Design für Mobile Geräte',
        description: 'Das Dashboard soll auf allen Bildschirmgrößen optimal dargestellt werden.',
        status: 'todo',
        priority: 'medium',
        labels: [mockLabels[0]!, mockLabels[3]!], // Frontend, Feature
        isEpic: false,
        createdAt: new Date('2024-01-16').toISOString(),
        updatedAt: new Date('2024-01-16').toISOString(),
      },
      {
        title: 'API Endpunkt für Ticket-Export',
        description: 'Benutzer sollen ihre Tickets als CSV oder JSON exportieren können.',
        status: 'in-progress',
        priority: 'low',
        labels: [mockLabels[1]!, mockLabels[3]!], // Backend, Feature
        isEpic: false,
        createdAt: new Date('2024-01-17').toISOString(),
        updatedAt: new Date('2024-01-20').toISOString(),
      },
      {
        title: 'Drag & Drop Bug auf Safari',
        description: 'Das Drag & Drop funktioniert auf Safari-Browsern nicht korrekt. Tickets bleiben "hängen".',
        status: 'review',
        priority: 'high',
        labels: [mockLabels[0]!, mockLabels[2]!], // Frontend, Bug
        isEpic: false,
        createdAt: new Date('2024-01-18').toISOString(),
        updatedAt: new Date('2024-01-22').toISOString(),
      },
      {
        title: 'Unit Tests für Ticket Controller',
        description: 'Vollständige Testabdeckung für alle CRUD-Operationen am Ticket Controller.',
        status: 'done',
        priority: 'medium',
        labels: [mockLabels[1]!, mockLabels[5]!], // Backend, Testing
        isEpic: false,
        createdAt: new Date('2024-01-10').toISOString(),
        updatedAt: new Date('2024-01-21').toISOString(),
      },
      {
        title: 'EPIC: Performance Optimierung',
        description: 'Umfassende Performance-Verbesserungen für Frontend und Backend.',
        status: 'backlog',
        priority: 'medium',
        labels: [mockLabels[0]!, mockLabels[1]!], // Frontend, Backend
        isEpic: true,
        createdAt: new Date('2024-01-19').toISOString(),
        updatedAt: new Date('2024-01-19').toISOString(),
      },
      {
        title: 'Dokumentation für API Endpoints',
        description: '', // Leere Beschreibung für Demo der Auto-Suggestion
        status: 'todo',
        priority: 'low',
        labels: [mockLabels[4]!], // Documentation
        isEpic: false,
        createdAt: new Date('2024-01-20').toISOString(),
        updatedAt: new Date('2024-01-20').toISOString(),
      },
    ];

    mockTickets.forEach((ticketData) => {
      const ticket: Ticket = {
        ...ticketData,
        id: this.generateTicketId(),
      };
      this.tickets.set(ticket.id, ticket);
    });

    this.nextTicketId = this.tickets.size + 1;
    this.nextLabelId = this.labels.size + 1;
  }

  // Ticket CRUD-Operationen
  getAllTickets(): Ticket[] {
    return Array.from(this.tickets.values());
  }

  getTicketById(id: string): Ticket | undefined {
    return this.tickets.get(id);
  }

  createTicket(ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket {
    const now = new Date().toISOString();
    const ticket: Ticket = {
      ...ticketData,
      id: this.generateTicketId(),
      createdAt: now,
      updatedAt: now,
    };
    this.tickets.set(ticket.id, ticket);
    return ticket;
  }

  updateTicket(id: string, updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>): Ticket | null {
    const ticket = this.tickets.get(id);
    if (!ticket) {
      return null;
    }

    const updatedTicket: Ticket = {
      ...ticket,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }

  deleteTicket(id: string): boolean {
    return this.tickets.delete(id);
  }

  // Label CRUD-Operationen
  getAllLabels(): Label[] {
    return Array.from(this.labels.values());
  }

  getLabelById(id: string): Label | undefined {
    return this.labels.get(id);
  }

  createLabel(labelData: Omit<Label, 'id'>): Label {
    const label: Label = {
      ...labelData,
      id: this.generateLabelId(),
    };
    this.labels.set(label.id, label);
    return label;
  }

  // Utility-Methoden
  private generateTicketId(): string {
    return `ticket-${this.nextTicketId++}`;
  }

  private generateLabelId(): string {
    return `label-${this.nextLabelId++}`;
  }

  // Statistiken
  getTicketsByStatus(status: TicketStatus): Ticket[] {
    return this.getAllTickets().filter((ticket) => ticket.status === status);
  }

  getTicketsByPriority(priority: TicketPriority): Ticket[] {
    return this.getAllTickets().filter((ticket) => ticket.priority === priority);
  }

  getEpics(): Ticket[] {
    return this.getAllTickets().filter((ticket) => ticket.isEpic);
  }
}

// Singleton-Instance
export const dataStore = new DataStore(); 