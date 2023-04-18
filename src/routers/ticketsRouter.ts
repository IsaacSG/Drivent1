import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTickets, getTicketType, getTickets } from '@/controllers';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken);
ticketRouter.get('types', getTicketType);
ticketRouter.get('', getTickets);
ticketRouter.post('', createTickets);

export { ticketRouter };
