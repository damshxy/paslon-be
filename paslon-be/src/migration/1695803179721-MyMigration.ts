import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1695803179721 implements MigrationInterface {
    name = 'MyMigration1695803179721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paslons" ("id" SERIAL NOT NULL, "name" character varying, "visi" character varying, "image" character varying, "posted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb7268cc991dfa9da1aa9c02941" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paslons"`);
    }

}
