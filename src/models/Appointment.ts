import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Patient from './Patient';
import Phisician from './Phisician';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  patient_id: string;

  @ManyToOne(() => Patient, {
    eager: true,
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column('uuid')
  phisician_id: string;

  @ManyToOne(() => Phisician, {
    eager: true,
  })
  @JoinColumn({ name: 'phisician_id' })
  phisician: Phisician;

  @Column('timestamp without time zone')
  start: Date;

  @Column('timestamp without time zone')
  end: Date;
}

export default Appointment;
