import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import ticketRoutes from './routes/tickets.js';
import labelRoutes from './routes/labels.js';

/**
 * Express Server Setup für Luise Backlog Tool
 */
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://luise-backlog.vercel.app'] // Beispiel für Production
    : ['http://localhost:5173', 'http://127.0.0.1:5173'], // Development
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/labels', labelRoutes);

// Health Check Endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Info Endpoint
app.get('/api', (req: express.Request, res: express.Response) => {
  res.json({
    name: 'Luise Backlog Tool API',
    version: '1.0.0',
    description: 'REST API für Scrum Backlog Management',
    endpoints: {
      tickets: '/api/tickets',
      labels: '/api/labels',
      health: '/health'
    }
  });
});

// 404 Handler
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint nicht gefunden',
    availableEndpoints: ['/api/tickets', '/api/labels', '/health']
  });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Interner Serverfehler' 
      : err.message || 'Unbekannter Fehler'
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Luise Backlog Tool API läuft auf Port ${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/health`);
  console.log(`📋 API Info: http://localhost:${PORT}/api`);
  console.log(`🎫 Tickets: http://localhost:${PORT}/api/tickets`);
  console.log(`🏷️  Labels: http://localhost:${PORT}/api/labels`);
});

export default app; 