import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('examples')
export class Example extends BaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;
}
