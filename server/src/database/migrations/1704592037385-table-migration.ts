import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableMigration1704592037385 implements MigrationInterface {
  name = 'TableMigration1704592037385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "imageUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageUrl"`);
  }
}
