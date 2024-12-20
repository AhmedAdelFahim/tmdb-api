import type { Knex } from 'knex';
import TABLES from '../tables.constant';

const tableName = TABLES.GENRE;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.string('tmdb_genre_id');
    table.string('genre_type').defaultTo('MOVIE');
    table.unique(['tmdb_genre_id', 'genre_type']);
    table.string('name');
    table.timestamps(null, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
