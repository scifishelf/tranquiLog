import { Router } from 'express';
import { LabelController } from '../controllers/LabelController.js';

const router = Router();

/**
 * @route GET /api/labels
 * @desc Alle Labels abrufen
 */
router.get('/', LabelController.getAllLabels);

/**
 * @route GET /api/labels/:id
 * @desc Label nach ID abrufen
 */
router.get('/:id', LabelController.getLabelById);

/**
 * @route POST /api/labels
 * @desc Neues Label erstellen
 */
router.post('/', LabelController.createLabel);

export default router; 