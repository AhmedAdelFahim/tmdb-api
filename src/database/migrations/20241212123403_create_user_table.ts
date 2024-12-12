import type { Knex } from 'knex';
import TABLES from '../tables.constant';

const tableName = TABLES.USER;
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments();
  });
}

export async function down(knex: Knex): Promise<void> {}
