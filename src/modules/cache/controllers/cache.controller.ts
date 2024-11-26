import { ApiResource } from '@responses/api-resource';
import { Controller, Delete, Inject } from '@nestjs/common';
import { log } from 'console';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('cache')
export class CacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Delete('reset')
  async getTransactions(): Promise<ApiResource<any>> {
    try {
      await this.cacheManager.reset();
      return ApiResource.successResponse('Cache has been cleared successfully');
    } catch (error) {
      log(error);
      return ApiResource.errorResponse(error);
    }
  }
}
