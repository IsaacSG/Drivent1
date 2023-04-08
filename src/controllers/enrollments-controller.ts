import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import enrollmentsService from '@/services/enrollments-service';
import { ViaCEPError } from '@/protocols';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  try {
    await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const cep = req.query.cep;
  try {
    const address = await enrollmentsService.getAddressFromCEP(String(cep));
    const nAddress = address as ViaCEPError;
    if(nAddress.erro === true) {
      return res.sendStatus(204);
    }
    res.status(httpStatus.OK).send(address);
    
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }
}
