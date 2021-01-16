import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { addHours, parseISO, isAfter, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';

class AppointmentController {
  public async index(request: Request, response: Response) {
    const appointmentRepository = getRepository(Appointment);
    const { fromDate, toDate } = request.query;
    let appointments: Array<Appointment> = [];

    if (!fromDate && !toDate) {
      const allAppointments = await appointmentRepository.find({
        order: { start: 'ASC' },
      });
      appointments = allAppointments;
    }

    if (fromDate) {
      const allAppointments = await appointmentRepository.find({
        order: { start: 'ASC' },
      });

      allAppointments.map(appointment => {
        const isAfterComparation = isAfter(
          appointment.start,
          parseISO(fromDate),
        );

        if (isAfterComparation) {
          appointments.push(appointment);
        }
      });
    }

    if (toDate) {
      const allAppointments = await appointmentRepository.find({
        order: { start: 'ASC' },
      });

      allAppointments.map(appointment => {
        const isBeforeComparation = isBefore(
          appointment.start,
          parseISO(toDate),
        );

        if (isBeforeComparation) {
          appointments.push(appointment);
        }
      });
    }

    if (appointments.length === 0) {
      return response.status(404).json({ message: 'not found' });
    }

    return response.status(200).json(appointments);
  }

  public async show(request: Request, response: Response) {
    const appointmentRepository = getRepository(Appointment);
    const { id: appointment_id } = request.params;

    const appointment = await appointmentRepository.findOne(appointment_id);

    if (!appointment) {
      return response.status(404).json({ message: 'not found' });
    }

    return response.status(200).json(appointment);
  }

  public async store(request: Request, response: Response) {
    const appointmentRepository = getRepository(Appointment);
    const { patient_id, phisician_id, start } = request.body;

    if (patient_id === '') {
      return response
        .status(400)
        .json({ message: 'patient_id cannot be empty' });
    }

    if (phisician_id === '') {
      return response
        .status(400)
        .json({ message: 'phisician_id cannot be empty' });
    }

    if (start === '') {
      return response.status(400).json({ message: 'start cannot be empty' });
    }

    const appointment = appointmentRepository.create({
      patient_id,
      phisician_id,
      start: parseISO(start),
      end: addHours(parseISO(start), 1),
    });

    await appointmentRepository.save(appointment);

    return response.status(201).json(appointment);
  }

  public async update(request: Request, response: Response) {
    const appointmentRepository = getRepository(Appointment);
    const { id: appointment_id } = request.params;

    const appointment = await appointmentRepository.findOne(appointment_id);

    if (!appointment) {
      return response.status(404).json({ message: 'not found' });
    }

    const { patient_id, phisician_id, start } = request.body;

    if (patient_id === '') {
      return response
        .status(400)
        .json({ message: 'patient_id cannot be empty' });
    }

    if (phisician_id === '') {
      return response
        .status(400)
        .json({ message: 'phisician_id cannot be empty' });
    }

    if (start === '') {
      return response.status(400).json({ message: 'start cannot be empty' });
    }

    appointment.start = parseISO(start);
    appointment.end = addHours(parseISO(start), 1);

    await appointmentRepository.save(appointment);
    await appointmentRepository.query(
      `UPDATE APPOINTMENTS SET PATIENT_ID = '${patient_id}' WHERE ID = '${appointment_id}'`,
    );
    await appointmentRepository.query(
      `UPDATE APPOINTMENTS SET PHISICIAN_ID = '${phisician_id}' WHERE ID = '${appointment_id}'`,
    );

    return response.status(204).json({ message: 'upload succeed' });
  }

  public async delete(request: Request, response: Response) {
    const appointmentRepository = getRepository(Appointment);
    const { id: appointment_id } = request.params;

    const appointment = await appointmentRepository.findOne(appointment_id);

    if (!appointment) {
      return response.status(404).json({ message: 'not found' });
    }

    await appointmentRepository.remove(appointment);

    return response.status(204).json({ message: 'remove succeed' });
  }
}

export default new AppointmentController();
