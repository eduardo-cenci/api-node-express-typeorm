import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1748909775151 implements MigrationInterface {
  name = 'Migration1748909775151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" decimal(10,2) NOT NULL, "description" text NOT NULL, "date" date NOT NULL, "category_id" integer)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" decimal(10,2) NOT NULL, "description" text NOT NULL, "date" date NOT NULL, "category_id" integer, CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_transactions"("id", "value", "description", "date", "category_id") SELECT "id", "value", "description", "date", "category_id" FROM "transactions"`
    );
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_transactions" RENAME TO "transactions"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" RENAME TO "temporary_transactions"`
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" decimal(10,2) NOT NULL, "description" text NOT NULL, "date" date NOT NULL, "category_id" integer)`
    );
    await queryRunner.query(
      `INSERT INTO "transactions"("id", "value", "description", "date", "category_id") SELECT "id", "value", "description", "date", "category_id" FROM "temporary_transactions"`
    );
    await queryRunner.query(`DROP TABLE "temporary_transactions"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
