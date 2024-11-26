import configuration from '@configs/configuration';
import TypeOrmConfigService from '@configs/typeorm/default';
import { ExceptionFilter } from '@exceptions/exception.filter';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AzureService } from '@modules/authentication/azure.service';
import { MasterModule } from '@modules/master/master.module';
import { TransactionModule } from '@modules/transaction/transaction.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as redisStore from 'cache-manager-ioredis';
import { CacheManageModule } from '@modules/cache/cache.module';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    CacheModule.registerAsync<CacheModuleOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          ttl: 60 * 60 * 24,
          store: redisStore,
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
          tls: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    HttpModule,
    TransactionModule,
    MasterModule,
    CacheManageModule,
  ],
  controllers: [AppController],
  providers: [
    AzureService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude({
        path: `docs`,
        method: RequestMethod.GET,
      })
      .forRoutes(`*`);
  }
}
