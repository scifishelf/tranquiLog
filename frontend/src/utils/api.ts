import { Ticket, Label, CreateTicketDto, UpdateTicketDto, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Allgemeine API-Request-Funktion
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
    };
  }
}

/**
 * Ticket API-Funktionen
 */
export const ticketApi = {
  /**
   * Alle Tickets abrufen
   */
  async getAll(): Promise<ApiResponse<Ticket[]>> {
    return apiRequest<Ticket[]>('/tickets');
  },

  /**
   * Ticket nach ID abrufen
   */
  async getById(id: string): Promise<ApiResponse<Ticket>> {
    return apiRequest<Ticket>(`/tickets/${id}`);
  },

  /**
   * Neues Ticket erstellen
   */
  async create(ticket: CreateTicketDto): Promise<ApiResponse<Ticket>> {
    return apiRequest<Ticket>('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  },

  /**
   * Ticket aktualisieren
   */
  async update(id: string, updates: UpdateTicketDto): Promise<ApiResponse<Ticket>> {
    return apiRequest<Ticket>(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Ticket löschen
   */
  async delete(id: string): Promise<ApiResponse<null>> {
    return apiRequest<null>(`/tickets/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Tickets nach Status filtern
   */
  async getByStatus(status: string): Promise<ApiResponse<Ticket[]>> {
    return apiRequest<Ticket[]>(`/tickets/status/${status}`);
  },
};

/**
 * Label API-Funktionen
 */
export const labelApi = {
  /**
   * Alle Labels abrufen
   */
  async getAll(): Promise<ApiResponse<Label[]>> {
    return apiRequest<Label[]>('/labels');
  },

  /**
   * Label nach ID abrufen
   */
  async getById(id: string): Promise<ApiResponse<Label>> {
    return apiRequest<Label>(`/labels/${id}`);
  },

  /**
   * Neues Label erstellen
   */
  async create(label: Omit<Label, 'id'>): Promise<ApiResponse<Label>> {
    return apiRequest<Label>('/labels', {
      method: 'POST',
      body: JSON.stringify(label),
    });
  },
};

/**
 * Utility-Funktionen
 */
export const apiUtils = {
  /**
   * Prüft, ob die API erreichbar ist
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch('/health');
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Generische Fehlerbehandlung für UI-Komponenten
   */
  handleApiError(error: string): string {
    // Hier können spezifische Fehlermeldungen für die UI angepasst werden
    if (error.includes('404')) {
      return 'Der angeforderte Datensatz wurde nicht gefunden.';
    }
    if (error.includes('500')) {
      return 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
    }
    if (error.includes('NetworkError') || error.includes('fetch')) {
      return 'Verbindung zum Server fehlgeschlagen. Prüfen Sie Ihre Internetverbindung.';
    }
    return error;
  },
}; 