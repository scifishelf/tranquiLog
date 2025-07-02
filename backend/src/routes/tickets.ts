import { Router } from 'express';
import { TicketController } from '../controllers/TicketController.js';

const router = Router();

/**
 * @route GET /api/tickets
 * @desc Alle Tickets abrufen
 */
router.get('/', TicketController.getAllTickets);

/**
 * @route GET /api/tickets/:id
 * @desc Ticket nach ID abrufen
 */
router.get('/:id', TicketController.getTicketById);

/**
 * @route POST /api/tickets
 * @desc Neues Ticket erstellen
 */
router.post('/', TicketController.createTicket);

/**
 * @route PUT /api/tickets/:id
 * @desc Ticket aktualisieren
 */
router.put('/:id', TicketController.updateTicket);

/**
 * @route DELETE /api/tickets/:id
 * @desc Ticket löschen
 */
router.delete('/:id', TicketController.deleteTicket);

/**
 * @route GET /api/tickets/status/:status
 * @desc Tickets nach Status filtern
 */
router.get('/status/:status', TicketController.getTicketsByStatus);

export default router; 