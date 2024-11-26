import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@repositories/base.repository';
import { Transaction } from '@entities/transaction.entity';

@Injectable()
export class TransactionRepository extends BaseRepository<Transaction> {
  constructor(dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }
}
