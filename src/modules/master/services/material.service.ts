import { Transaction } from '@entities/transaction.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '@repositories/transaction.repository';
import { UserProfileRepository } from '@repositories/user-profile.repository';
import { equals } from 'class-validator';

@Injectable()
export class MaterialService {
  constructor(
    private transactionRepository: TransactionRepository,
    private userProfileRepository: UserProfileRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async materials(email: string, role: string) {
    let transactions = [];
    let salesRepAccountIds = [];
    const emailProfile = { email: email };
    if (equals(role, 'ADMIN')) emailProfile.email = 'ADMIN_TEST@TEST.COM';
    const userProfile = await this.userProfileRepository.findBy(emailProfile);
    salesRepAccountIds = userProfile.map(
      (profile) => profile.salesRepAccountId,
    );

    console.log(salesRepAccountIds);
    const cacheKey = `materials_${salesRepAccountIds.join('_')}`;
    if (salesRepAccountIds.length === 0) {
      return [];
    }

    const cacheResults = await this.cacheManager.get(cacheKey);
    if (cacheResults) return cacheResults;

    const conditionSalesRepresentative = `AND "sales_representative" IN (${salesRepAccountIds.map((_, i) => `@${i}`).join(', ')})`;
    const getTransactions = await this.transactionRepository.query(
      `select cutomer_test from customer WHERE 1 = 1 ${conditionSalesRepresentative}`,
      [...salesRepAccountIds],
    );

    transactions = getTransactions.map((row: any) => {
      const transaction = Transaction.mapToTransaction(row);
      return transaction;
    });

    const results = transactions.map((item: Transaction) => {
      return {
        shipToCode: item.shipToCode,
        soldToCode: item.soldToCode,
        endCustomerCode: item.endCustomerCode,
        productionSite: item.productionSite,
        channelGroup: item.channelGroup,
        label: item.materialCode,
        value: item.materialCode,
      };
    });

    await this.cacheManager.set(cacheKey, results);
    return results;
  }
}
