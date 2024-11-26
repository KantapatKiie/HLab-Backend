import { PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_date',
    type: 'datetime',
    default: () => 'GETDATE()',
  })
  createdDate: Date;

  @Column({ name: 'created_by', type: 'varchar', default: 'migration' })
  createdBy?: string;
}
