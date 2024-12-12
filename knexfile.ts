import type { Knex } from 'knex';

// Update with your config settings.

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DB_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
};

module.exports = config;
