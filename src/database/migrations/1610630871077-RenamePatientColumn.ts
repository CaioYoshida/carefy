import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RenamePatientColumn1610630871077
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'patients',
      'prefered_phone',
      'preferred_phone',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'patients',
      'preferred_phone',
      'prefered_phone',
    );
  }
}
