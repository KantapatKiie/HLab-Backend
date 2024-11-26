import { ApiResource } from '@responses/api-resource';
import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { log } from 'console';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

@Controller()
@UseInterceptors(CacheInterceptor)

export class AppController {
  constructor() { }
  @CacheKey('version')
  @Get('version')
  @ApiOkResponse({
    description: 'Successful retrieval of current version',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'string',
              example: '1.0.0',
            },
            status: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 200,
                },
                message: {
                  type: 'string',
                  example: 'OK',
                },
              }
            }
          }
        }
      ]
    },
  })

  async getVersion(): Promise<ApiResource<any>> {
    try {
      return ApiResource.successResponse(process.env.APP_VERSION || '1.0.0');
    } catch (error) {
      log(error)
      return ApiResource.errorResponse(error);
    }
  }

}
