import { MigrationInterface, QueryRunner } from "typeorm"

export class migration1660812064681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE "hotels" (
            "id" SERIAL NOT NULL,
            "hotel_name" ,
            "hotel_address" ,
            "hotel_phone",
            "hotel_amenities",
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE "hotels"
    `);
    }

}
