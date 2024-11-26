import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@repositories/base.repository';
import { ProductionSite } from '@entities/production-site.entity';

@Injectable()
export class ProductionSiteRepository extends BaseRepository<ProductionSite> {
  constructor(dataSource: DataSource) {
    super(ProductionSite, dataSource.createEntityManager());
  }
}
