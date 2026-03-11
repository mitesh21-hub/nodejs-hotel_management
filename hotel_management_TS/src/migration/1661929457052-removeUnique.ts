import { MigrationInterface, QueryRunner } from "typeorm"

export class removeUnique1661929457052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Bookings" DROP INDEX "Bookings.REL_7a7177d2a38de57b1e34b5f648"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
