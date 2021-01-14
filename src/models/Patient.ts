import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('uuid')
  preferred_phone: string;
}

export default Patient;
