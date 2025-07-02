import { Ticket, Label } from '../types';

const STORAGE_KEYS = {
  TICKETS: 'luise-tickets',
  LABELS: 'luise-labels',
  FILTERS: 'luise-filters',
} as const;

/**
 * LocalStorage Utility für Offline-Persistierung
 */
export const localStorageUtils = {
  /**
   * Prüft ob LocalStorage verfügbar ist
   */
  isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Tickets in LocalStorage speichern
   */
  saveTickets(tickets: Ticket[]): void {
    if (this.isAvailable()) {
      try {
        localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
      } catch (error) {
        console.warn('Fehler beim Speichern der Tickets:', error);
      }
    }
  },

  /**
   * Tickets aus LocalStorage laden
   */
  loadTickets(): Ticket[] {
    if (this.isAvailable()) {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.TICKETS);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.warn('Fehler beim Laden der Tickets:', error);
      }
    }
    return [];
  },

  /**
   * Labels in LocalStorage speichern
   */
  saveLabels(labels: Label[]): void {
    if (this.isAvailable()) {
      try {
        localStorage.setItem(STORAGE_KEYS.LABELS, JSON.stringify(labels));
      } catch (error) {
        console.warn('Fehler beim Speichern der Labels:', error);
      }
    }
  },

  /**
   * Labels aus LocalStorage laden
   */
  loadLabels(): Label[] {
    if (this.isAvailable()) {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.LABELS);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.warn('Fehler beim Laden der Labels:', error);
      }
    }
    return [];
  },

  /**
   * Einzelnes Ticket aktualisieren
   */
  updateTicket(ticket: Ticket): void {
    const tickets = this.loadTickets();
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index !== -1) {
      tickets[index] = ticket;
      this.saveTickets(tickets);
    }
  },

  /**
   * Ticket hinzufügen
   */
  addTicket(ticket: Ticket): void {
    const tickets = this.loadTickets();
    tickets.push(ticket);
    this.saveTickets(tickets);
  },

  /**
   * Ticket entfernen
   */
  removeTicket(ticketId: string): void {
    const tickets = this.loadTickets();
    const filteredTickets = tickets.filter(t => t.id !== ticketId);
    this.saveTickets(filteredTickets);
  },

  /**
   * Alle Daten löschen
   */
  clear(): void {
    if (this.isAvailable()) {
      try {
        localStorage.removeItem(STORAGE_KEYS.TICKETS);
        localStorage.removeItem(STORAGE_KEYS.LABELS);
        localStorage.removeItem(STORAGE_KEYS.FILTERS);
      } catch (error) {
        console.warn('Fehler beim Löschen der Daten:', error);
      }
    }
  },

  /**
   * Sync mit Server-Daten (überschreibt LocalStorage)
   */
  syncWithServer(tickets: Ticket[], labels: Label[]): void {
    this.saveTickets(tickets);
    this.saveLabels(labels);
  },

  /**
   * Offline-Modus: Lade Daten aus LocalStorage
   */
  getOfflineData(): { tickets: Ticket[]; labels: Label[] } {
    return {
      tickets: this.loadTickets(),
      labels: this.loadLabels(),
    };
  },
}; 