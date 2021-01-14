import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phisicians')
class Phisician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;
}

export default Phisician;
