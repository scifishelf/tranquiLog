import { useState, useEffect } from 'react';
import { useTicketStore } from '../../store/useTicketStore';
import { CreateTicketDto, UpdateTicketDto } from '../../types';

const TicketModal = () => {
  const { 
    modal, 
    closeModal, 
    createTicket, 
    updateTicket, 
    labels 
  } = useTicketStore();

  const [formData, setFormData] = useState<CreateTicketDto>({
    title: '',
    description: '',
    status: 'backlog',
    priority: 'medium',
    labels: []
  });

  useEffect(() => {
    if (modal.isOpen && modal.mode === 'edit' && modal.ticket) {
      setFormData({
        title: modal.ticket.title,
        description: modal.ticket.description,
        status: modal.ticket.status,
        priority: modal.ticket.priority,
        labels: modal.ticket.labels
      });
    } else if (modal.isOpen && modal.mode === 'create') {
      setFormData({
        title: '',
        description: '',
        status: 'backlog',
        priority: 'medium',
        labels: []
      });
    }
  }, [modal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modal.mode === 'create') {
      await createTicket(formData);
    } else if (modal.mode === 'edit' && modal.ticket) {
      const updates: UpdateTicketDto = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        labels: formData.labels
      };
      await updateTicket(modal.ticket.id, updates);
    }
  };

  const handleChange = (field: keyof CreateTicketDto, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {modal.mode === 'create' ? 'Neues Ticket' : 'Ticket bearbeiten'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titel*
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="form-select"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priorität
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="form-select"
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
                <option value="critical">Kritisch</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labels
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {labels.map((label) => (
                <label key={label.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.labels?.some(l => l.id === label.id) || false}
                    onChange={(e) => {
                      const currentLabels = formData.labels || [];
                      if (e.target.checked) {
                        handleChange('labels', [...currentLabels, label]);
                      } else {
                        handleChange('labels', currentLabels.filter(l => l.id !== label.id));
                      }
                    }}
                    className="mr-2"
                  />
                  <span
                    className="inline-block px-2 py-1 rounded text-white text-xs mr-2"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="btn-outline"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {modal.mode === 'create' ? 'Erstellen' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal; 