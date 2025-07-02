import { CreateTicketDto, TicketSuggestions, TicketPriority } from '../types/index.js';

/**
 * Service für Business Logic rund um Tickets
 */
export class TicketService {
  /**
   * Generiert Vorschläge für ein Ticket basierend auf Titel und Labels
   */
  static generateSuggestions(ticketData: CreateTicketDto): TicketSuggestions {
    const suggestions: TicketSuggestions = {
      isEpicDetected: false,
    };

    // Epic-Erkennung anhand Titel
    if (ticketData.title) {
      suggestions.isEpicDetected = this.detectEpic(ticketData.title);
    }

    // Prioritätsvorschläge basierend auf Labels
    if (ticketData.labels && ticketData.labels.length > 0) {
      suggestions.suggestedPriority = this.suggestPriorityFromLabels(ticketData.labels);
    }

    // Vorschlag für leere Beschreibung
    if (!ticketData.description || ticketData.description.trim() === '') {
      suggestions.suggestedDescription = this.generateDescriptionSuggestion(ticketData.title || '');
    }

    return suggestions;
  }

  /**
   * Erkennt Epics anhand des Titels
   */
  private static detectEpic(title: string): boolean {
    const epicPatterns = [
      /^EPIC:/i,
      /^Epic:/i,
      /\[EPIC\]/i,
      /\[Epic\]/i,
    ];

    return epicPatterns.some(pattern => pattern.test(title));
  }

  /**
   * Schlägt Priorität basierend auf Labels vor
   */
  private static suggestPriorityFromLabels(labels: any[]): TicketPriority | undefined {
    const labelNames = labels.map(label => label.name?.toLowerCase() || '');

    // Kritische Labels -> Hohe Priorität
    if (labelNames.includes('bug') || labelNames.includes('security') || labelNames.includes('hotfix')) {
      return 'high';
    }

    // Feature-Labels -> Mittlere Priorität
    if (labelNames.includes('feature') || labelNames.includes('enhancement')) {
      return 'medium';
    }

    // Dokumentation/Testing -> Niedrige Priorität
    if (labelNames.includes('documentation') || labelNames.includes('testing') || labelNames.includes('refactor')) {
      return 'low';
    }

    return undefined;
  }

  /**
   * Generiert einen Beschreibungsvorschlag basierend auf dem Titel
   */
  private static generateDescriptionSuggestion(title: string): string {
    if (!title) {
      return 'Bitte Beschreibung ergänzen...';
    }

    // Verschiedene Vorschläge basierend auf Titel-Inhalten
    const titleLower = title.toLowerCase();

    if (titleLower.includes('bug') || titleLower.includes('fehler')) {
      return 'Bitte beschreibe das Problem detailliert:\n- Was ist passiert?\n- Welches Verhalten wurde erwartet?\n- Schritte zur Reproduktion\n- Screenshots falls relevant';
    }

    if (titleLower.includes('epic')) {
      return 'Bitte beschreibe den Umfang dieses Epics:\n- Ziele und Anforderungen\n- Betroffene Komponenten\n- Abhängigkeiten\n- Definition of Done';
    }

    if (titleLower.includes('test') || titleLower.includes('testing')) {
      return 'Bitte beschreibe die Test-Anforderungen:\n- Zu testende Funktionalitäten\n- Testarten (Unit, Integration, E2E)\n- Akzeptanzkriterien';
    }

    if (titleLower.includes('dokumentation') || titleLower.includes('documentation')) {
      return 'Bitte beschreibe was dokumentiert werden soll:\n- Zielgruppe\n- Umfang der Dokumentation\n- Format (API-Docs, User Guide, etc.)';
    }

    return 'Bitte ergänze eine detaillierte Beschreibung:\n- Hintergrund und Kontext\n- Anforderungen\n- Akzeptanzkriterien\n- Definition of Done';
  }

  /**
   * Validiert Ticket-Daten
   */
  static validateTicketData(data: CreateTicketDto): string[] {
    const errors: string[] = [];

    if (!data.title || data.title.trim() === '') {
      errors.push('Titel ist erforderlich');
    }

    if (data.title && data.title.length > 200) {
      errors.push('Titel darf maximal 200 Zeichen haben');
    }

    if (data.description && data.description.length > 5000) {
      errors.push('Beschreibung darf maximal 5000 Zeichen haben');
    }

    return errors;
  }
} 