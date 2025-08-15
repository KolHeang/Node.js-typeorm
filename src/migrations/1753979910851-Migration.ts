import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753979910851 implements MigrationInterface {
    name = 'Migration1753979910851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "twoFactorSecret" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isTwoFactorEnabled" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isTwoFactorEnabled"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twoFactorSecret"`);
    }

}
