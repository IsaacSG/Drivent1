import { Router } from 'express';
import ticketsController from '@/controllers/ticketsControllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/ticketSchema';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', ticketsController.getAllUserTickets)
  .get('/types', ticketsController.getAllTicketsTypes)
  .post('/', validateBody(ticketSchema), ticketsController.postTicket);

export { ticketsRouter };
