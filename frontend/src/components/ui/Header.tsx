import { useTicketStore } from '../../store/useTicketStore';

const Header = () => {
  const { openCreateModal, tickets } = useTicketStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Luise Backlog Tool
            </h1>
            <span className="text-sm text-gray-500">
              {tickets.length} Tickets
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={openCreateModal}
              className="btn-primary"
            >
              + Neues Ticket
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 