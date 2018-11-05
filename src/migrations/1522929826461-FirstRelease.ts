import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export class FirstRelease1522929826461 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        //         await queryRunner.query(`
        // CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(500) NOT NULL, "password" character varying(100) NOT NULL, "roles" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "uk_user_email" UNIQUE ("email"), PRIMARY KEY("id"));
        // CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "power" integer NOT NULL, "type" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), PRIMARY KEY("id"));
        // CREATE TABLE "contract" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "power" integer NOT NULL, "type" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "productId" integer, PRIMARY KEY("id"));
        // ALTER TABLE "contract" ADD CONSTRAINT "fk_6881b96c8bc652b2ef12839a4c3" FOREIGN KEY ("userId") REFERENCES "user"("id");
        // ALTER TABLE "contract" ADD CONSTRAINT "fk_a3942de6472a799a053ecb979f2" FOREIGN KEY ("productId") REFERENCES "product"("id");
        //         `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.dropTable('contract');
        // await queryRunner.dropTable('product');
        // await queryRunner.dropTable('user');
    }
}
