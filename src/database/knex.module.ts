import { Module, Global, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import knex from 'knex';

@Global()
@Module({
  providers: [
    {
      provide: 'KNEX_CONNECTION',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const DB_URL = configService.get<string>('database.dbURL');
        const knexConfig: Knex.Config = {
          client: 'pg', // Change to your database client (e.g., 'mysql', 'sqlite3', etc.)
          connection: DB_URL,
          pool: { min: 2, max: 10 },
          migrations: {
            tableName: 'knex_migrations',
          },
        };
        const knexInstance = knex(knexConfig);
        try {
          await knexInstance.raw('SELECT 1');
          Logger.verbose('Connected to postgres');
        } catch (e) {
          Logger.error(e.message);
          Logger.error('Can not connect to postgres');
        }
        return knexInstance;
      },
    },
  ],
  exports: ['KNEX_CONNECTION'],
})
export class KnexModule {}
