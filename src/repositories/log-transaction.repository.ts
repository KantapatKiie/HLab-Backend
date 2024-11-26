import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@repositories/base.repository';
import { LogTransaction } from '@entities/log-transaction.entity';

@Injectable()
export class LogTransactionRepository extends BaseRepository<LogTransaction> {
  constructor(dataSource: DataSource) {
    super(LogTransaction, dataSource.createEntityManager());
  }
}
