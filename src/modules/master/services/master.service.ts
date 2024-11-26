import { Injectable } from '@nestjs/common';
import { ProductionSiteRepository } from '@repositories/production-site.repository';

@Injectable()
export class MasterService {
  constructor(private productionSiteRepository: ProductionSiteRepository) {}

  async productionSites() {
    return this.productionSiteRepository.find();
  }
}
