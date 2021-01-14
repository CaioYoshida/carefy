import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('telephones')
class Telephone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  area_code: string;

  @Column()
  number: string;

  @Column()
  description: string;

  @Column('uuid')
  owner_id: string;
}

export default Telephone;
