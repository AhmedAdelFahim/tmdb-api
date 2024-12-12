import { Module } from '@nestjs/common';
import configSchema from './config/config-schema';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './caching/redis.module';
import { KnexModule } from './database/knex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // validationSchema: configSchema(),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    RedisModule,
    KnexModule,
  ],
})
export class AppModule {}
