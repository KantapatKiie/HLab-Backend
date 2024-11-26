import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'log_transactions', schema: 'TRANS' })
export class LogTransaction extends BaseEntity {
  @Column({ name: 'log_transaction_id', nullable: false })
  logTransactionId: string;

  @Column({ name: 'tag', nullable: false })
  tag: string;

  @Column({ name: 'data', type: 'nvarchar', length: 'max', nullable: true })
  data?: string;

  @Column({ name: 'user_agent', nullable: true })
  userAgent?: string;
}
