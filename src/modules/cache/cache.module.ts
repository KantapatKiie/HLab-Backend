import { Module } from '@nestjs/common';
import { CacheController } from './controllers/cache.controller';

@Module({
  imports: [],
  controllers: [CacheController],
  providers: [],
})
export class CacheManageModule {}
