import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patient from '../models/Patient';

interface PatientRequest extends Request {
  query: {
    search: string;
  };
}

class PatientController {
  public async index(request: PatientRequest, response: Response) {
    const patientRepository = getRepository(Patient);
    const { search } = request.query;
    let patients: Array<Patient> = [];

    if (!search) {
      const allPatients = await patientRepository.find({
        order: { name: 'ASC' },
      });
      patients = allPatients;
    } else {
      const allPatients = await patientRepository.find({
        order: { name: 'ASC' },
      });

      allPatients.map(patient => {
        const patientMatched = patient.name.includes(search);

        if (patientMatched) {
          patients.push(patient);
        }
      });
    }

    if (patients.length === 0) {
      return response.status(404).json({ message: 'not found' });
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

    if (name === '') {
      return response.status(400).json({ message: 'name cannot be empty' });
    }

    const nameIsAlreadyRegistered = await patientRepository.find({
      where: { name },
    });

    if (nameIsAlreadyRegistered.length === 1) {
      return response
        .status(409)
        .json({ message: 'name is already registered' });
    }

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

    if (name === '') {
      return response.status(400).json({ message: 'name cannot be empty' });
    }

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
