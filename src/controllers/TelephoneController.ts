import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Telephone from '../models/Telephone';

class TelephoneController {
  public async index(request: Request, response: Response) {
    const telephoneRepository = getRepository(Telephone);
    const telephones = await telephoneRepository.find();

    if (!telephones) {
      return response.status(404);
    }

    return response.status(200).json(telephones);
  }

  public async show(request: Request, response: Response) {
    const telephoneRepository = getRepository(Telephone);
    const { id: telephone_id } = request.params;

    const telephone = await telephoneRepository.findOne(telephone_id);

    if (!telephone) {
      return response.status(404);
    }

    return response.status(200).json(telephone);
  }

  public async store(request: Request, response: Response) {
    const telephoneRepository = getRepository(Telephone);
    const { area_code, number, description, owner_id } = request.body;

    const telephone = telephoneRepository.create({
      area_code,
      number,
      description,
      owner_id,
    });

    await telephoneRepository.save(telephone);

    return response.status(201).json(telephone);
  }

  public async update(request: Request, response: Response) {
    const telephoneRepository = getRepository(Telephone);
    const { id: telephone_id } = request.params;

    const telephone = await telephoneRepository.findOne(telephone_id);

    if (!telephone) {
      return response.status(404).json({ message: 'not found' });
    }

    const { area_code, number, description } = request.body;

    telephone.area_code = area_code;
    telephone.number = number;
    telephone.description = description;

    await telephoneRepository.save(telephone);

    return response.status(204).json(telephone);
  }

  public async delete(request: Request, response: Response) {
    const telephoneRepository = getRepository(Telephone);
    const { id: telephone_id } = request.params;

    const telephone = await telephoneRepository.findOne(telephone_id);

    if (!telephone) {
      return response.status(404).json({ message: 'not found' });
    }

    await telephoneRepository.remove(telephone);

    return response.status(204).json({ message: 'remove succeed' });
  }
}

export default new TelephoneController();
