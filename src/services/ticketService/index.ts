import { TicketStatus, TicketType, Ticket } from '@prisma/client';
import { enrollmentNotFound } from './error';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticketRepository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
  getAllTicketsTypes,
  getAllUserTickets,
  postTicket,
};

async function getAllTicketsTypes(): Promise<TicketType[]> {
  const result = await ticketRepository.getAllTicketsTypes();
  return result;
}

async function getAllUserTickets(id: number): Promise<Ticket & { TicketType: TicketType }> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw enrollmentNotFound();
  const ticket = await ticketRepository.getAllUserTickets(enrollment.id);
  if (!ticket) throw new Error();
  return ticket;
}

async function postTicket(ticketTypeId: number, id: number): Promise<Ticket & { TicketType: TicketType }> {
  const status: TicketStatus = 'RESERVED';
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw enrollmentNotFound();

  const result = await ticketRepository.postTicket(ticketTypeId, enrollment.id, status);
  return result;
}
export default ticketService;
