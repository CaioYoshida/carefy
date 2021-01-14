import { getRepository } from 'typeorm';

import Telephone from '../models/Telephone';

interface Request {
  area_code: string;
  number: string;
  description: string;
  owner_id: string;
}

class createTelephoneService {
  public async execute({
    area_code,
    number,
    description,
    owner_id,
  }: Request): Promise<Telephone> {
    const telephoneRepository = getRepository(Telephone);

    const telephone = telephoneRepository.create({
      area_code,
      number,
      description,
      owner_id,
    });

    await telephoneRepository.save(telephone);

    return telephone;
  }
}

export default createTelephoneService;
