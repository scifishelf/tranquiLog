import { useEffect } from 'react';
import { useTicketStore } from './store/useTicketStore';
import KanbanBoard from './components/board/KanbanBoard';
import TicketModal from './components/modal/TicketModal';
import Header from './components/ui/Header';
import ErrorAlert from './components/ui/ErrorAlert';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
  const { 
    loadTickets, 
    loadLabels, 
    loading, 
    error, 
    clearError 
  } = useTicketStore();

  useEffect(() => {
    // Lade initiale Daten
    const loadData = async () => {
      await Promise.all([
        loadTickets(),
        loadLabels()
      ]);
    };

    loadData();
  }, [loadTickets, loadLabels]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {error && (
          <ErrorAlert 
            message={error} 
            onClose={clearError}
            className="mb-6"
          />
        )}
        
        {loading ? (
          <LoadingSpinner message="Lade Tickets..." />
        ) : (
          <KanbanBoard />
        )}
      </main>

      <TicketModal />
    </div>
  );
}

export default App; 