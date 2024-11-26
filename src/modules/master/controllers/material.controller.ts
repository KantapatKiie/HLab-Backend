import { ApiResource } from '@responses/api-resource';
import { Controller, Get, Headers } from '@nestjs/common';
import { log } from 'console';
import { DefaultMasterResponse } from '../responses/master.response';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { TransactionsHeaders } from '@modules/transaction/requests/transaction-header.request';
import { MaterialService } from '../services/material.service';

@Controller('masters')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @Get('materials')
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
  async getMaterials(
    @Headers() { email, role }: TransactionsHeaders,
  ): Promise<ApiResource<any>> {
    try {
      const response = await this.materialService.materials(email, role);
      return ApiResource.successResponse(response);
    } catch (error) {
      log(error);
      return ApiResource.errorResponse(error);
    }
  }
}
