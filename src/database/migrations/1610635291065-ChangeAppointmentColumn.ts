import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeAppointmentColumn1610635291065
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'start',
      new TableColumn({
        name: 'start',
        type: 'timestamp without time zone',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'appointments',
      'end',
      new TableColumn({
        name: 'end',
        type: 'timestamp without time zone',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'start',
      new TableColumn({
        name: 'start',
        type: 'timestamp with time zone',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'appointments',
      'end',
      new TableColumn({
        name: 'end',
        type: 'timestamp with time zone',
        isNullable: false,
      }),
    );
  }
}
