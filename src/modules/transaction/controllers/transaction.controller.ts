import { ApiResource } from '@responses/api-resource';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Post,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { log } from 'console';
import { CreateTransaction } from '../requests/transaction.request';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateTransactionResponse,
  Transaction,
} from '../responses/transaction.response';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { TransactionsHeaders } from '../requests/transaction-header.request';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiExtraModels(ApiResource, Transaction)
  @ApiOkResponse({
    description: 'Successful retrieval of transactions',
    schema: {
      oneOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Transaction) },
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
  @Get()
  async getTransactions(
    @Headers() { email, role }: TransactionsHeaders,
  ): Promise<ApiResource<any>> {
    try {
      const response = await this.transactionService.findTransactionHistories(
        email,
        role,
      );

      return ApiResource.successResponse(response);
    } catch (error) {
      log(error);
      return ApiResource.errorResponse(error);
    }
  }

  @Post()
  @ApiExtraModels(CreateTransactionResponse)
  @ApiOkResponse({
    type: CreateTransactionResponse,
  })
  async createTransactions(
    @Headers() { email, userAgent }: TransactionsHeaders,
    @Body() payload: CreateTransaction,
  ): Promise<CreateTransactionResponse> {
    const messageId = uuidv4();
    try {
      return await this.transactionService.createTransaction(
        email,
        userAgent,
        messageId,
        payload,
      );
    } catch (error) {
      console.log(error);

      const createTransactionResponse = new CreateTransactionResponse();
      createTransactionResponse.message = messageId;
      createTransactionResponse.transactionNumber = payload.transactionNumber;

      if (error instanceof HttpException) {
        this.transactionService.logTransaction(messageId, 'error', {
          message: error?.getResponse().toString(),
        });
        createTransactionResponse.setError(error.getResponse().toString());
        return createTransactionResponse;
      } else {
        createTransactionResponse.setError(
          'Something went wrong please contact administrator',
        );
        if (
          error?.response &&
          error?.response.data &&
          error?.response.data.length &&
          error?.response.data[0].message
        ) {
          this.transactionService.logTransaction(messageId, 'error', {
            message: error?.response.data[0].message,
          });
          createTransactionResponse.setError(error?.response.data[0].message);
        }
        return createTransactionResponse;
      }
    }
  }
}
