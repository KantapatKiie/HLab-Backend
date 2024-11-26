import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { TransactionRepository } from '@repositories/transaction.repository';
import { SalesforceClient } from 'clients/salesforce.client';
import { HttpModule } from '@nestjs/axios';
import { LogTransactionRepository } from '@repositories/log-transaction.repository';
import { UserProfileRepository } from '@repositories/user-profile.repository';

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    SalesforceClient,
    LogTransactionRepository,
    UserProfileRepository,
  ],
})
export class TransactionModule {}
