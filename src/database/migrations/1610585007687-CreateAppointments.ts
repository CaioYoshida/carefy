import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1610585007687
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'patient_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'phisician_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'start',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'end',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
