import { Request, Response } from 'express';
import { dataStore } from '../models/DataStore.js';
import { CreateTicketDto, UpdateTicketDto, ApiResponse, Ticket } from '../types/index.js';
import { TicketService } from '../utils/TicketService.js';

/**
 * Controller für Ticket-CRUD-Operationen
 */
export class TicketController {
  /**
   * Alle Tickets abrufen
   */
  static getAllTickets(req: Request, res: Response): void {
    try {
      const tickets = dataStore.getAllTickets();
      const response: ApiResponse<Ticket[]> = {
        success: true,
        data: tickets,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Abrufen der Tickets',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Ticket nach ID abrufen
   */
  static getTicketById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const ticket = dataStore.getTicketById(id);

      if (!ticket) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Ticket nicht gefunden',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Ticket> = {
        success: true,
        data: ticket,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Abrufen des Tickets',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Neues Ticket erstellen
   */
  static createTicket(req: Request, res: Response): void {
    try {
      const createDto: CreateTicketDto = req.body;

      // Validierung
      if (!createDto.title || createDto.title.trim() === '') {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Titel ist erforderlich',
        };
        res.status(400).json(response);
        return;
      }

      // Business Logic anwenden
      const suggestions = TicketService.generateSuggestions(createDto);
      
      const ticketData = {
        title: createDto.title,
        description: createDto.description || suggestions.suggestedDescription || '',
        status: createDto.status || 'backlog',
        priority: createDto.priority || suggestions.suggestedPriority || 'medium',
        labels: createDto.labels || [],
        isEpic: suggestions.isEpicDetected,
      };

      const ticket = dataStore.createTicket(ticketData);

      const response: ApiResponse<Ticket> = {
        success: true,
        data: ticket,
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Erstellen des Tickets',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Ticket aktualisieren
   */
  static updateTicket(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const updateDto: UpdateTicketDto = req.body;

      // Prüfen ob Ticket existiert
      if (!dataStore.getTicketById(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Ticket nicht gefunden',
        };
        res.status(404).json(response);
        return;
      }

      // Business Logic für Updates anwenden
      const updates: Partial<Ticket> = { ...updateDto };
      
      if (updateDto.title) {
        const suggestions = TicketService.generateSuggestions({ title: updateDto.title });
        updates.isEpic = suggestions.isEpicDetected;
        
        // Priorität nur vorschlagen, wenn sie nicht explizit gesetzt wurde
        if (!updateDto.priority && suggestions.suggestedPriority) {
          updates.priority = suggestions.suggestedPriority;
        }
      }

      const updatedTicket = dataStore.updateTicket(id, updates);

      const response: ApiResponse<Ticket> = {
        success: true,
        data: updatedTicket!,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Aktualisieren des Tickets',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Ticket löschen
   */
  static deleteTicket(req: Request, res: Response): void {
    try {
      const { id } = req.params;

      if (!dataStore.getTicketById(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Ticket nicht gefunden',
        };
        res.status(404).json(response);
        return;
      }

      const deleted = dataStore.deleteTicket(id);

      if (deleted) {
        const response: ApiResponse<null> = {
          success: true,
        };
        res.json(response);
      } else {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Fehler beim Löschen des Tickets',
        };
        res.status(500).json(response);
      }
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Löschen des Tickets',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Tickets nach Status filtern
   */
  static getTicketsByStatus(req: Request, res: Response): void {
    try {
      const { status } = req.params;
      
      if (!['backlog', 'todo', 'in-progress', 'review', 'done'].includes(status)) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Ungültiger Status',
        };
        res.status(400).json(response);
        return;
      }

      const tickets = dataStore.getTicketsByStatus(status as any);
      const response: ApiResponse<Ticket[]> = {
        success: true,
        data: tickets,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Filtern der Tickets',
      };
      res.status(500).json(response);
    }
  }
} 