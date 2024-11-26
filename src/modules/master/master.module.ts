import { Module } from '@nestjs/common';
import { MasterController } from './controllers/transaction.controller';
import { MasterService } from './services/master.service';
import { ProductionSiteRepository } from '@repositories/production-site.repository';
import { MaterialService } from './services/material.service';
import { TransactionRepository } from '@repositories/transaction.repository';
import { UserProfileRepository } from '@repositories/user-profile.repository';
import { MaterialController } from './controllers/material.controller';

@Module({
  imports: [],
  controllers: [MasterController, MaterialController],
  providers: [
    MasterService,
    ProductionSiteRepository,
    MaterialService,
    TransactionRepository,
    UserProfileRepository,
  ],
})
export class MasterModule {}
