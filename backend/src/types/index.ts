/**
 * Status eines Tickets im Scrum-Board
 */
export type TicketStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';

/**
 * Priorität eines Tickets
 */
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Label für Kategorisierung von Tickets
 */
export interface Label {
  id: string;
  name: string;
  color: string;
}

/**
 * Hauptstruktur eines Tickets
 */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  labels: Label[];
  isEpic: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO für das Erstellen eines neuen Tickets
 */
export interface CreateTicketDto {
  title: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  labels?: Label[];
}

/**
 * DTO für das Aktualisieren eines Tickets
 */
export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  labels?: Label[];
}

/**
 * API Response-Wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Business Logic Suggestions
 */
export interface TicketSuggestions {
  suggestedPriority?: TicketPriority | undefined;
  suggestedDescription?: string | undefined;
  isEpicDetected: boolean;
} 