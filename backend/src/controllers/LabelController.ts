import { Request, Response } from 'express';
import { dataStore } from '../models/DataStore.js';
import { ApiResponse, Label } from '../types/index.js';

/**
 * Controller für Label-CRUD-Operationen
 */
export class LabelController {
  /**
   * Alle Labels abrufen
   */
  static getAllLabels(req: Request, res: Response): void {
    try {
      const labels = dataStore.getAllLabels();
      const response: ApiResponse<Label[]> = {
        success: true,
        data: labels,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Abrufen der Labels',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Label nach ID abrufen
   */
  static getLabelById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const label = dataStore.getLabelById(id);

      if (!label) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Label nicht gefunden',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Label> = {
        success: true,
        data: label,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Abrufen des Labels',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Neues Label erstellen
   */
  static createLabel(req: Request, res: Response): void {
    try {
      const { name, color } = req.body;

      // Validierung
      if (!name || name.trim() === '') {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Name ist erforderlich',
        };
        res.status(400).json(response);
        return;
      }

      if (!color || color.trim() === '') {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Farbe ist erforderlich',
        };
        res.status(400).json(response);
        return;
      }

      const label = dataStore.createLabel({ name: name.trim(), color: color.trim() });

      const response: ApiResponse<Label> = {
        success: true,
        data: label,
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Fehler beim Erstellen des Labels',
      };
      res.status(500).json(response);
    }
  }
} 