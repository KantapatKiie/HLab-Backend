import { ApiResource } from '@responses/api-resource';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { log } from 'console';
import { MasterService } from '../services/master.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { DefaultMasterResponse } from '../responses/master.response';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { MaterialService } from '../services/material.service';

@Controller('masters')
@UseInterceptors(CacheInterceptor)
export class MasterController {
  constructor(
    private readonly masterService: MasterService,
    private readonly materialService: MaterialService,
  ) {}

  @CacheKey('payment_terms')
  @Get('payment-terms')
  @ApiExtraModels(ApiResource, DefaultMasterResponse)
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('payment_term_ranking')
  @Get('payment-term-ranking')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('production_sites')
  @Get('production-sites')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  async getProductionSites(): Promise<ApiResource<any>> {
    try {
      const response = await this.masterService.productionSites();
      return ApiResource.successResponse(response);
    } catch (error) {
      log(error);
      return ApiResource.errorResponse(error);
    }
  }

  @CacheKey('selling_approaches')
  @Get('selling-approaches')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('custom_clearances')
  @Get('custom-clearances')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('channels')
  @Get('channels')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('container_sizes')
  @Get('container-sizes')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('currencies')
  @Get('currencies')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('incoterms')
  @Get('incoterms')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  @CacheKey('sales_qouta_types')
  @Get('sales-qouta-types')
  @ApiOkResponse({
    description: 'Successful retrieval of masters',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DefaultMasterResponse) },
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
              },
            },
          },
        },
      ],
    },
  })
  async getSalesQoutaTypes(): Promise<ApiResource<any>> {
    try {
      const response = await this.masterService.productionSites();
      return ApiResource.successResponse(response);
    } catch (error) {
      log(error);
      return ApiResource.errorResponse(error);
    }
  }
}
