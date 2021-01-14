import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  patient_id: string;

  @Column('uuid')
  phisician_id: string;

  @Column('time with time zone')
  start: Date;

  @Column('time with time zone')
  end: Date;
}

export default Patient;
