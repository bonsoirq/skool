import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudents1605442268815 implements MigrationInterface {
  TABLE_NAME = 'students'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'lastName',
          type: 'string',
        },
        {
          name: 'phoneNo',
          type: 'string',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME)
  }

}
