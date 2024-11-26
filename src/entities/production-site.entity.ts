import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'production_site', schema: 'MST' })
export class ProductionSite extends BaseEntity {
  @Column()
  value: string;

  @Column()
  label: string;
}
