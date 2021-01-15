import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  patient_id: string;

  @Column('uuid')
  phisician_id: string;

  @Column('timestamp without time zone')
  start: Date;

  @Column('timestamp without time zone')
  end: Date;
}

export default Patient;
