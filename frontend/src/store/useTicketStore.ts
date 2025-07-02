import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Ticket, Label, TicketFilters, ModalState, CreateTicketDto, UpdateTicketDto } from '../types';
import { ticketApi, labelApi, apiUtils } from '../utils/api';

interface TicketStore {
  // State
  tickets: Ticket[];
  labels: Label[];
  filters: TicketFilters;
  modal: ModalState;
  loading: boolean;
  error: string | null;

  // Actions
  loadTickets: () => Promise<void>;
  loadLabels: () => Promise<void>;
  createTicket: (ticket: CreateTicketDto) => Promise<void>;
  updateTicket: (id: string, updates: UpdateTicketDto) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  moveTicket: (ticketId: string, newStatus: string) => Promise<void>;
  
  // Computed
  getFilteredTickets: () => Ticket[];
  
  // Modal Actions
  openCreateModal: () => void;
  openEditModal: (ticket: Ticket) => void;
  closeModal: () => void;
  
  // Filter Actions
  setFilters: (filters: Partial<TicketFilters>) => void;
  clearFilters: () => void;
  
  // Utility Actions
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * Hilfsfunktion zur Filterung von Tickets
 */
const filterTickets = (tickets: Ticket[], filters: TicketFilters): Ticket[] => {
  return tickets.filter(ticket => {
    // Status Filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(ticket.status)) return false;
    }

    // Priority Filter
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(ticket.priority)) return false;
    }

    // Label Filter
    if (filters.labels && filters.labels.length > 0) {
      const hasMatchingLabel = ticket.labels.some(label => 
        filters.labels!.includes(label.id)
      );
      if (!hasMatchingLabel) return false;
    }

    // Text Search
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const titleMatch = ticket.title.toLowerCase().includes(searchLower);
      const descriptionMatch = ticket.description.toLowerCase().includes(searchLower);
      if (!titleMatch && !descriptionMatch) return false;
    }

    // Epics Only Filter
    if (filters.showEpicsOnly && !ticket.isEpic) {
      return false;
    }

    return true;
  });
};

/**
 * Zustand Store für Ticket Management
 */
export const useTicketStore = create<TicketStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        tickets: [],
        labels: [],
        filters: {},
        modal: {
          isOpen: false,
          mode: 'create',
        },
        loading: false,
        error: null,

        // Computed
        getFilteredTickets: () => {
          const { tickets, filters } = get();
          return filterTickets(tickets, filters);
        },

        // Ticket Actions
        loadTickets: async () => {
          set({ loading: true, error: null });
          try {
            const response = await ticketApi.getAll();
            if (response.success && response.data) {
              set({ tickets: response.data, loading: false });
            } else {
              set({ 
                error: apiUtils.handleApiError(response.error || 'Fehler beim Laden der Tickets'),
                loading: false 
              });
            }
          } catch (error) {
            set({ 
              error: 'Unbekannter Fehler beim Laden der Tickets',
              loading: false 
            });
          }
        },

        loadLabels: async () => {
          try {
            const response = await labelApi.getAll();
            if (response.success && response.data) {
              set({ labels: response.data });
            } else {
              set({ error: apiUtils.handleApiError(response.error || 'Fehler beim Laden der Labels') });
            }
          } catch (error) {
            set({ error: 'Unbekannter Fehler beim Laden der Labels' });
          }
        },

        createTicket: async (ticketData: CreateTicketDto) => {
          set({ loading: true, error: null });
          try {
            const response = await ticketApi.create(ticketData);
            if (response.success && response.data) {
              const { tickets } = get();
              set({ 
                tickets: [...tickets, response.data],
                loading: false,
                modal: { isOpen: false, mode: 'create' }
              });
            } else {
              set({ 
                error: apiUtils.handleApiError(response.error || 'Fehler beim Erstellen des Tickets'),
                loading: false 
              });
            }
          } catch (error) {
            set({ 
              error: 'Unbekannter Fehler beim Erstellen des Tickets',
              loading: false 
            });
          }
        },

        updateTicket: async (id: string, updates: UpdateTicketDto) => {
          set({ loading: true, error: null });
          try {
            const response = await ticketApi.update(id, updates);
            if (response.success && response.data) {
              const { tickets } = get();
              const updatedTickets = tickets.map(ticket =>
                ticket.id === id ? response.data! : ticket
              );
              set({ 
                tickets: updatedTickets,
                loading: false,
                modal: { isOpen: false, mode: 'edit' }
              });
            } else {
              set({ 
                error: apiUtils.handleApiError(response.error || 'Fehler beim Aktualisieren des Tickets'),
                loading: false 
              });
            }
          } catch (error) {
            set({ 
              error: 'Unbekannter Fehler beim Aktualisieren des Tickets',
              loading: false 
            });
          }
        },

        deleteTicket: async (id: string) => {
          set({ loading: true, error: null });
          try {
            const response = await ticketApi.delete(id);
            if (response.success) {
              const { tickets } = get();
              const filteredTickets = tickets.filter(ticket => ticket.id !== id);
              set({ tickets: filteredTickets, loading: false });
            } else {
              set({ 
                error: apiUtils.handleApiError(response.error || 'Fehler beim Löschen des Tickets'),
                loading: false 
              });
            }
          } catch (error) {
            set({ 
              error: 'Unbekannter Fehler beim Löschen des Tickets',
              loading: false 
            });
          }
        },

        moveTicket: async (ticketId: string, newStatus: string) => {
          const { updateTicket } = get();
          await updateTicket(ticketId, { status: newStatus as any });
        },

        // Modal Actions
        openCreateModal: () => {
          set({ 
            modal: { 
              isOpen: true, 
              mode: 'create',
              ticket: undefined
            }
          });
        },

        openEditModal: (ticket: Ticket) => {
          set({ 
            modal: { 
              isOpen: true, 
              mode: 'edit',
              ticket
            }
          });
        },

        closeModal: () => {
          set({ 
            modal: { 
              isOpen: false, 
              mode: 'create',
              ticket: undefined
            }
          });
        },

        // Filter Actions
        setFilters: (newFilters: Partial<TicketFilters>) => {
          const { filters } = get();
          set({ filters: { ...filters, ...newFilters } });
        },

        clearFilters: () => {
          set({ filters: {} });
        },

        // Utility Actions
        setError: (error: string | null) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'luise-ticket-store',
        partialize: (state) => ({ 
          filters: state.filters 
        }), // Nur Filter persistieren, nicht die Daten
      }
    ),
    {
      name: 'luise-ticket-store',
    }
  )
); 