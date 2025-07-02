import { useTicketStore } from '../../store/useTicketStore';
import { TicketStatus, StatusConfig } from '../../types';

const statusConfigs: StatusConfig[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100'
  },
  {
    id: 'todo',
    title: 'To Do',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 'review',
    title: 'Review',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'done',
    title: 'Done',
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  }
];

const KanbanBoard = () => {
  const { getFilteredTickets, openEditModal, moveTicket } = useTicketStore();
  const filteredTickets = getFilteredTickets();

  const getTicketsByStatus = (status: TicketStatus) => {
    return filteredTickets.filter(ticket => ticket.status === status);
  };

  const handleTicketClick = (ticket: any) => {
    openEditModal(ticket);
  };

  const handleStatusChange = async (ticketId: string, newStatus: TicketStatus) => {
    await moveTicket(ticketId, newStatus);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {statusConfigs.map((statusConfig) => {
        const tickets = getTicketsByStatus(statusConfig.id);
        
        return (
          <div key={statusConfig.id} className="flex-shrink-0 w-80">
            <div className={`${statusConfig.bgColor} ${statusConfig.color} px-4 py-2 rounded-t-lg font-medium flex items-center justify-between`}>
              <span>{statusConfig.title}</span>
              <span className="text-sm bg-white bg-opacity-70 px-2 py-1 rounded">
                {tickets.length}
              </span>
            </div>
            
            <div className="bg-gray-50 min-h-[500px] p-4 rounded-b-lg space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`card-hover p-4 cursor-pointer border-l-4 ${getPriorityColor(ticket.priority)}`}
                  onClick={() => handleTicketClick(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">
                      {ticket.isEpic && (
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                          EPIC
                        </span>
                      )}
                      {ticket.title}
                    </h3>
                  </div>
                  
                  {ticket.description && (
                    <p className="text-gray-600 text-sm text-truncate-2 mb-3">
                      {ticket.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {ticket.labels.slice(0, 2).map((label) => (
                        <span
                          key={label.id}
                          className="inline-block text-xs px-2 py-1 rounded text-white"
                          style={{ backgroundColor: label.color }}
                        >
                          {label.name}
                        </span>
                      ))}
                      {ticket.labels.length > 2 && (
                        <span className="text-xs text-gray-500 px-1">
                          +{ticket.labels.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <select
                      value={ticket.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(ticket.id, e.target.value as TicketStatus);
                      }}
                      className="text-xs border border-gray-300 rounded px-1 py-1 bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {statusConfigs.map((config) => (
                        <option key={config.id} value={config.id}>
                          {config.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              
              {tickets.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Keine Tickets in diesem Status</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard; 