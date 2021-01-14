import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patient from '../models/Patient';

class PatientController {
  public async index(request: Request, response: Response) {
    const patientRepository = getRepository(Patient);
    const patients = await patientRepository.find();

    if (!patients) {
      return response.status(404);
    }

    return response.status(200).json(patients);
  }

  public async show(request: Request, response: Response) {
    const patientRepository = getRepository(Patient);
    const { id: patient_id } = request.params;

    const patient = await patientRepository.findOne(patient_id);

    if (!patient) {
      return response.status(404).json({ message: 'not found' });
    }

    return response.status(200).json(patient);
  }

  public async store(request: Request, response: Response) {
    const patientRepository = getRepository(Patient);
    const { name, preferred_phone } = request.body;

    const patient = patientRepository.create({
      name,
      preferred_phone,
    });

    await patientRepository.save(patient);

    return response.status(201).json(patient);
  }

  public async update(request: Request, response: Response) {
    const patientRepository = getRepository(Patient);
    const { id: patient_id } = request.params;

    const patient = await patientRepository.findOne(patient_id);

    if (!patient) {
      return response.status(404).json({ message: 'not found' });
    }

    const { name, preferred_phone } = request.body;

    patient.name = name;
    patient.preferred_phone = preferred_phone;

    await patientRepository.save(patient);

    return response.status(204).json({ message: 'update succeed' });
  }

  public async delete(request: Request, response: Response) {
    const patientRepository = getRepository(Patient);
    const { id: patient_id } = request.params;

    const patient = await patientRepository.findOne(patient_id);

    if (!patient) {
      return response.status(404).json({ message: 'not found' });
    }

    await patientRepository.remove(patient);

    return response.status(204).json({ message: 'remove succeed' });
  }
}

export default new PatientController();
