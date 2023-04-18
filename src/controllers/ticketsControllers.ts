import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/ticketService';
import { TicketPost } from '@/protocols';

async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const allTicketsTypes = await ticketService.getAllTicketsTypes();
    return res.status(httpStatus.OK).send(allTicketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

async function getAllUserTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;

    const allUserTickets = await ticketService.getAllUserTickets(userId);
    if (allUserTickets) return res.status(httpStatus.OK).json(allUserTickets);
    else throw new Error();
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

async function postTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const { ticketTypeId } = req.body as TicketPost;
    const ticket = await ticketService.postTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

const ticketsController = {
  getAllTicketsTypes,
  getAllUserTickets,
  postTicket,
};

export default ticketsController;
