import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Phisician from '../models/Phisician';

class PhisicianController {
  public async index(request: Request, response: Response) {
    const phisicianRepository = getRepository(Phisician);
    const { search } = request.query;
    let phisicians: Array<Phisician> = [];

    if (!search) {
      const allPhisicians = await phisicianRepository.find();
      phisicians = allPhisicians;
    } else {
      const allPhisicians = await phisicianRepository.find();

      allPhisicians.map(phisician => {
        const phisicianMatched = phisician.name.includes(search);

        if (phisicianMatched) {
          phisicians.push(phisician);
        }
      });
    }

    if (phisicians.length === 0) {
      return response.status(404).json({ message: 'not found' });
    }

    return response.status(200).json(phisicians);
  }

  public async show(request: Request, response: Response) {
    const phisicianRepository = getRepository(Phisician);
    const { id: phisician_id } = request.params;

    const phisician = await phisicianRepository.findOne(phisician_id);

    if (!phisician) {
      return response.status(404).json({ message: 'not found' });
    }

    return response.status(200).json(phisician);
  }

  public async store(request: Request, response: Response) {
    const phisicianRepository = getRepository(Phisician);
    const { name } = request.body;

    if (name === '') {
      return response.status(400).json({ message: 'name cannot be empty' });
    }

    const nameIsAlreadyRegistered = await phisicianRepository.find({
      where: { name },
    });

    if (nameIsAlreadyRegistered.length === 1) {
      return response
        .status(409)
        .json({ message: 'name is already registered' });
    }

    const phisician = phisicianRepository.create({
      name,
    });

    await phisicianRepository.save(phisician);

    return response.status(201).json(phisician);
  }

  public async update(request: Request, response: Response) {
    const phisicianRepository = getRepository(Phisician);
    const { id: phisician_id } = request.params;

    const phisician = await phisicianRepository.findOne(phisician_id);

    if (!phisician) {
      return response.status(404).json({ message: 'not found' });
    }

    const { name } = request.body;

    if (name === '') {
      return response.status(400).json({ message: 'name cannot be empty' });
    }

    phisician.name = name;

    await phisicianRepository.save(phisician);

    return response.status(204).json({ message: 'update succeed' });
  }

  public async delete(request: Request, response: Response) {
    const phisicianRepository = getRepository(Phisician);
    const { id: phisician_id } = request.params;

    const phisician = await phisicianRepository.findOne(phisician_id);

    if (!phisician) {
      return response.status(404).json({ message: 'not found' });
    }

    await phisicianRepository.remove(phisician);

    return response.status(204).json({ message: 'remove succeed' });
  }
}

export default new PhisicianController();
