import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/ticketService';

export async function getTicketType(req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketService.getTicketByUserId(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketType } = req.body;

  if (!ticketType) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const ticket = await ticketService.createTicket(userId, ticketType);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}
