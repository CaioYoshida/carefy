import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Appointment from '../models/Appointment';

class PatientAppointmentsController {
  public async index(request: Request, response: Response) {
    const appointmentRepository = getRepository(Appointment);
    const { id: patient_id } = request.params;

    const patientAppointments = await appointmentRepository.find({
      where: { patient_id },
    });

    if (!patientAppointments) {
      return response.status(404).json({ message: 'not found' });
    }

    return response.status(200).json(patientAppointments);
  }
}

export default new PatientAppointmentsController();
