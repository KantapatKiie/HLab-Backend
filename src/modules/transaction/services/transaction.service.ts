import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '@repositories/transaction.repository';
import { CreateTransaction } from '../requests/transaction.request';
import { v4 as uuidv4 } from 'uuid';
import {
  InquiryInfo,
  InquiryItem,
  RequestCreateUpdateInquiry,
  RequestUpdateParkInquiry,
} from 'clients/salesforce.type';
import * as dayjs from 'dayjs';
import { SalesforceClient } from 'clients/salesforce.client';
import { lastValueFrom } from 'rxjs';
import { LogTransactionRepository } from '@repositories/log-transaction.repository';
import {
  CreateTransactionResponse,
  CreateTransactionStatus,
} from '../responses/transaction.response';
import { orderBy } from 'lodash';
import { Transaction } from '@entities/transaction.entity';
import { equals } from 'class-validator';
import { UserProfileRepository } from '@repositories/user-profile.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private salesforceClient: SalesforceClient,
    private logTransactionRepository: LogTransactionRepository,
    private userProfileRepository: UserProfileRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findTransactionHistories(email: string, role: string) {
    let transactions = [];
    let salesRepAccountIds = [];
    const emailProfile = { email: email };
    if (equals(role, 'ADMIN')) emailProfile.email = 'ADMIN_TEST@TEST.COM';
    const userProfile = await this.userProfileRepository.findBy(emailProfile);
    salesRepAccountIds = userProfile.map(
      (profile) => profile.salesRepAccountId,
    );

    const cacheKey = `transactions_${salesRepAccountIds.join('_')}`;

    const cacheResults = await this.cacheManager.get(cacheKey);
    if (cacheResults) return cacheResults;

    let conditionSalesRepresentative = '';
    if (salesRepAccountIds.length !== 0)
      conditionSalesRepresentative = `OR "transactions"."sales_representative" IN (${salesRepAccountIds.map((_, i) => `@${i + 1}`).join(', ')})`;
    const getTransactions = await this.transactionRepository.query(
      `SELECT * FROM (SELECT *, DENSE_RANK() OVER (PARTITION BY "transactions"."ship_to", "transactions"."sold_to", "transactions"."end_customer", "transactions"."production_site", "transactions"."channel" ORDER BY "transactions"."created_date" DESC) AS "row_num" FROM "TRANS"."transactions" "transactions" WHERE "transactions"."email" = @0 ${conditionSalesRepresentative}) "a" WHERE a.row_num <= 10 order by "created_date" DESC`,
      [emailProfile.email, ...salesRepAccountIds],
    );

    transactions = getTransactions.map((row: any) => {
      const transaction = Transaction.mapToTransaction(row);
      return transaction;
    });

    const groupedData = Object.values(
      transactions.reduce((acc, item) => {
        const { transactionNumber } = item;
        if (!acc[transactionNumber]) {
          acc[transactionNumber] = {
            transactionNumber: item.transactionNumber,
            shipTo: item.shipTo,
            shipToName: item.shipToName,
            shipToCode: item.shipToCode,
            shipToAddress: item.shipToAddress,
            soldTo: item.soldTo,
            soldToCode: item.soldToCode,
            salesCo: item.salesCo,
            salesCoCode: item.salesCoCode,
            sellingApproach: item.sellingApproach,
            sellingApproachName: item.sellingApproachName,
            productionSite: item.productionSite,
            productionSiteName: item.productionSiteName,
            salesPartner: item.salesPartnerCode,
            salesPartnerName: item.salesPartnerName,
            paymentTerm: item.paymentTerm,
            paymentTermName: item.paymentTermName,
            poNumber: item.poNumber,
            poDate: item.poDate,
            channel: item.channel,
            channelName: item.channelName,
            channelGroup: item.channelGroup,
            endCustomerCode: item.endCustomerCode,
            endCustomer: item.endCustomer,
            customClearance: item.customClearance,
            transactionShortnameDisplay: '',
            currency: item.currency,
            containerSize: item.containerSize,
            remarkForCS: item.remarkForCS,
            incoterms: item.incoterms,
            modeOfTransport: item.modeOfTransport,
            items: [],
            paymentTermLevel: item.paymentTermLevel,
            lastModifiedDate: item.lastModifiedDate,
            createdDate: item.createdDate,
          };
        }
        acc[transactionNumber].items.push({
          transactionItemNumber: item.transactionItemNumber,
          transactionItemId: item.transactionItemId,
          materail: item.materialCode,
          sqType: item.sqType,
          material: item.materialCode,
          materialGrade: item.materialGrade,
          materialGroup: item.materialGroup,
          package: item.package,
          productColor: item.productColor,
          productSub: item.productSub,
          application: item.application,
          product: item.product,
          commission: item.commission,
          quantity: item.quantity,
          containerSize: item.containerSize,
          sellingPrice: item.sellingPrice,
          class: item.class,
        });
        return acc;
      }, {}),
    );

    let results: any = groupedData.map((value: any) => {
      value.transactionShortnameDisplay = `${value.transactionNumber} / ${value.items.length}`;
      return value;
    });
    results = orderBy(results, ['createdDate'], ['desc']);

    await this.cacheManager.set(cacheKey, results);
    return results;
  }

  async createTransaction(
    email: string,
    userAgent: string,
    messageId: string,
    createTransaction: CreateTransaction,
  ) {
    const createTransactionResponse = new CreateTransactionResponse();
    createTransactionResponse.status = CreateTransactionStatus.SUCCESS;
    createTransactionResponse.messageId = messageId;
    createTransactionResponse.transactionNumber = '';
    await this.logTransaction(
      messageId,
      'request-TEST',
      createTransaction,
      email,
      userAgent,
    );

    for (const item of createTransaction.items) {
      if (!dayjs(item.loadDate, 'YYYY-MM-DD').isValid()) {
        createTransactionResponse.setError('Load date format is invalid');
        return createTransactionResponse;
      }
    }

    if (
      !createTransaction.poDate &&
      createTransaction.poDate !== '' &&
      !dayjs(createTransaction.poDate, 'YYYY-MM-DD').isValid()
    ) {
      createTransactionResponse.setError('PO date format is invalid');
      return createTransactionResponse;
    }

    const transaction = await this.transactionRepository.findOneBy({
      transactionNumber: createTransaction.transactionNumber,
    });
    const tokenResponse = await lastValueFrom(this.salesforceClient.getToken());

    if (!tokenResponse.data?.access_token) {
      createTransactionResponse.setError('Get salesforce token error');
      return createTransactionResponse;
    }
    if (!transaction) {
      createTransactionResponse.setError('Transaction number not found');
      return createTransactionResponse;
    }

    const cloneRequest = {
      HeaderInfo: {
        SourceSystem: process.env.SALES_FORCE_SOURCE_SYSTEM,
        messageId: messageId,
        serialization: uuidv4(),
        requestedBy: email,
        Action: 'clone',
        SendReplicate: true,
      },
      InquiryInfo: { Id: transaction.transactionId },
      InquiryItemList: [],
    };
    await this.logTransaction(
      messageId,
      'request-cloneInquiry',
      cloneRequest,
      email,
    );
    let cloneInquiryResponse: any;
    try {
      createTransactionResponse.message = `Create transaction number ${cloneInquiryResponse.data?.InquiryInfo.Name} successfully`;
    } catch (error) {
      createTransactionResponse.setError(
        `[clone] ${error?.response?.data[0].message}`,
      );
      await this.logTransaction(
        messageId,
        'response-cloneInquiry',
        error?.response?.data || error?.response,
        email,
      );
      await this.logTransaction(
        messageId,
        'response-TEST',
        createTransactionResponse,
        email,
      );
      return createTransactionResponse;
    }
    await this.logTransaction(
      messageId,
      'response-cloneInquiry',
      cloneInquiryResponse?.data,
      email,
    );

    if (cloneInquiryResponse?.data?.Status !== 'Success') {
      createTransactionResponse.setError(
        `[clone] ${cloneInquiryResponse?.data?.Error[0].message}`,
      );
      await this.logTransaction(
        messageId,
        'response-TEST',
        createTransactionResponse,
        email,
      );
      return createTransactionResponse;
    }

    // console.log(createTransaction.items.length, cloneInquiryResponse.data.InquiryItemList.length)
    let cancelTransactions = [];
    const cloneTransactions = [];
    for (const item of createTransaction.items) {
      if (!item.transactionItemNumber) {
        cloneTransactions.push(item);
      } else {
        const transactionItem = cloneInquiryResponse.data.InquiryItemList.find(
          (value: any) => value.Name === String(item.transactionItemNumber),
        );
        if (transactionItem) {
          if (transactionItem.MaterialCode__r.Name === item.materialCode) {
            transactionItem.materialCode = item.materialCode;
            transactionItem.quantity = item.quantity;
            transactionItem.price = item.price;
            transactionItem.sqType = item.sqType;
            transactionItem.commission = item.commission;
            transactionItem.loadDate = item.loadDate;
            transactionItem.diffPrice = item.diffPrice;
            transactionItem.exchangeRateForCh40 = item.exchangeRateForCh40;
            transactionItem.endCustPriceUSD = item.endCustPriceUSD;
            transactionItem.containerSize = item.containerSize;
            transactionItem.remarkForApproval = item.remarkForApproval;
            cloneTransactions.push(transactionItem);
          } else {
            cloneTransactions.push(item);
            cancelTransactions.push({ Id: transactionItem.Id });
          }
        } else {
          if (transactionItem?.Id) {
            cancelTransactions.push({ Id: transactionItem.Id });
          } else {
            cloneTransactions.push(item);
          }
        }
      }
    }

    const cloneTransactionNames = cloneTransactions
      .map((value) => value.Name)
      .filter((value) => value);
    for (const item of cloneInquiryResponse.data.InquiryItemList) {
      if (cloneTransactionNames.length === 0) {
        cancelTransactions.push({ Id: item.Id });
      } else {
        const transactionItem = cloneTransactionNames.find(
          (value) => value === String(item.Name),
        );
        if (!transactionItem) {
          cancelTransactions.push({ Id: item.Id });
        }
      }
    }
    cancelTransactions = cancelTransactions.reduce<any[]>(
      (accumulator, current) => {
        const idSet = new Set(accumulator.map((item) => item.Id));
        if (!idSet.has(current.Id)) {
          accumulator.push(current);
        }
        return accumulator;
      },
      [],
    );

    // if (createTransaction.items.length < cloneInquiryResponse.data.InquiryItemList.length) {
    //   cancelTransactions = cloneInquiryResponse.data.InquiryItemList.slice(cloneInquiryResponse.data.InquiryItemList.length - 1).map((value) => {
    //     return { Id: value.Id }
    //   })
    // }

    // cloneTransactions.forEach((value => {
    //   console.log(value.Name, value.Id)
    // }))
    // console.log(cancelTransactions)
    // return;
    const userProfile = await this.userProfileRepository.findOneBy({
      email: email,
    });
    const requestCreateUpdateInquiry: RequestCreateUpdateInquiry = {
      HeaderInfo: {
        SourceSystem: process.env.SALES_FORCE_SOURCE_SYSTEM,
        messageId: messageId,
        serialization: uuidv4(),
        requestedBy: email,
        Action: 'update',
        SendReplicate: true,
      },
      InquiryInfo: this.getGenerateTransationInfoFromClone(
        cloneInquiryResponse.data?.InquiryInfo,
        transaction,
        createTransaction,
        userProfile.salesRepAccountId,
      ),
      CancelItemInfo: cancelTransactions,
      InquiryItemList: cloneTransactions.map((createTransactionItem) => {
        // const cloneTransaction = cloneTransactions.find(value => value.Name === createTransactionItem.transactionItemNumber);
        if (createTransactionItem.Name) {
          const response: InquiryItem = {
            Id: createTransactionItem.Id,
            SalesOrg__c: createTransactionItem.SalesOrg__c,
            Sales_Group__c: createTransactionItem.Sales_Group__c,
            Channel__c: createTransactionItem.Channel__c,
            MaterialCode__r: {
              Name: createTransactionItem.materialCode,
            },
            Class__c: createTransactionItem.materialCode.slice(-1),
            Unit__c: createTransactionItem.Unit__c,
            RemarkforApproval__c: createTransactionItem.remarkForApproval,
            Com_Upfront_Domestic__c: undefined,
            Container_Size__c: undefined,
          };

          if (
            createTransactionItem.containerSize &&
            createTransactionItem.containerSize !== 'none'
          ) {
            response.Container_Size__c =
              createTransactionItem.containerSize ||
              createTransactionItem.Container_Size__c;
          }
          if (createTransaction.channel !== '30') {
            if (
              createTransactionItem.commission &&
              createTransactionItem.commission !== 0
            )
              response.Com_Upfront_Domestic__c =
                createTransactionItem.commission;
          }

          return response;
        } else {
          const response: InquiryItem = {
            SalesOrg__c:
              cloneInquiryResponse.data.InquiryItemList[0].Sale_Quota_Type__c,
            Sales_Group__c:
              cloneInquiryResponse.data.InquiryItemList[0].Sales_Group__c,
            Channel__c: cloneInquiryResponse.data.InquiryItemList[0].Channel__c,
            MaterialCode__r: {
              Name: createTransactionItem.materialCode,
            },
            Class__c: createTransactionItem.materialCode.slice(-1),
            Unit__c: cloneInquiryResponse.data.InquiryItemList[0].Unit__c,
            RemarkforApproval__c: createTransactionItem.remarkForApproval,
            Com_Upfront_Domestic__c: undefined,
            Container_Size__c: undefined,
          };

          if (
            createTransactionItem.containerSize &&
            createTransactionItem.containerSize !== 'none'
          ) {
            response.Container_Size__c = createTransactionItem.containerSize;
          }
          if (createTransaction.channel !== '30') {
            if (
              createTransactionItem.commission &&
              createTransactionItem.commission !== 0
            )
              response.Com_Upfront_Domestic__c =
                createTransactionItem.commission;
          }

          return response;
        }
      }),
    };

    await this.logTransaction(
      messageId,
      'request-ceateUpdateInquiry',
      requestCreateUpdateInquiry,
      email,
    );
    let ceateUpdateInquiryReponse: any;

    try {
      ceateUpdateInquiryReponse = await lastValueFrom(
        this.salesforceClient.ceateUpdateInquiry(
          requestCreateUpdateInquiry,
          tokenResponse.data?.access_token,
        ),
      );
    } catch (error) {
      createTransactionResponse.setError(
        `[create] ${error?.response?.data[0].message}`,
      );
      await this.logTransaction(
        messageId,
        'response-ceateUpdateInquiry',
        error?.response?.data || error?.response,
        email,
      );
      await this.logTransaction(
        messageId,
        'response-TEST',
        createTransactionResponse,
        email,
      );
      return createTransactionResponse;
    }
    await this.logTransaction(
      messageId,
      'response-ceateUpdateInquiry',
      ceateUpdateInquiryReponse.data,
      email,
    );
    createTransactionResponse.urlLink = this.getGenerateUrlLink(
      ceateUpdateInquiryReponse,
    );

    createTransactionResponse.transactionNumber =
      ceateUpdateInquiryReponse.data?.InquiryInfo?.Name;
    if (ceateUpdateInquiryReponse?.data?.Status !== 'Success') {
      createTransactionResponse.setError(
        `[create] ${ceateUpdateInquiryReponse?.data?.Error[0].message}`,
      );
      await this.logTransaction(
        messageId,
        'response-TEST',
        createTransactionResponse,
        email,
      );
      return createTransactionResponse;
    }

    requestCreateUpdateInquiry.HeaderInfo.Action = createTransaction.actionType;

    if (requestCreateUpdateInquiry.HeaderInfo.SendReplicate) {
      delete requestCreateUpdateInquiry.HeaderInfo.SendReplicate;
    }
    const requestUpdateParkInquiry: RequestUpdateParkInquiry = {
      HeaderInfo: requestCreateUpdateInquiry.HeaderInfo,
      InquiryInfo: {
        Id: ceateUpdateInquiryReponse.data?.InquiryInfo?.Id,
      },
      InquiryItemList: ceateUpdateInquiryReponse.data?.InquiryItemList.map(
        (value: any) => {
          delete value.No_of_Container_Cal__c;
          delete value.NoofContainer__c;
          return value;
        },
      ),
    };
    requestUpdateParkInquiry.InquiryItemList =
      requestUpdateParkInquiry.InquiryItemList.filter((value) => {
        const isFoundCancelItem =
          requestCreateUpdateInquiry.CancelItemInfo.find((cancelItem) => {
            return cancelItem.Id === value.Id;
          });
        if (!isFoundCancelItem) return value;
      });

    await this.logTransaction(
      messageId,
      'request-ceateUpdateInquiry-park',
      requestUpdateParkInquiry,
      email,
    );
    let updateParkResponse: any;
    try {
      updateParkResponse = await lastValueFrom(
        this.salesforceClient.ceateUpdateInquiry(
          requestUpdateParkInquiry,
          tokenResponse.data?.access_token,
        ),
      );
    } catch (error) {
      createTransactionResponse.setWarning(
        `[park] ${error?.response?.data[0].message}`,
      );
      await this.logTransaction(
        messageId,
        'response-ceateUpdateInquiry-park',
        error?.response?.data || error?.response,
        email,
      );
      await this.logTransaction(
        messageId,
        'response-TEST',
        createTransactionResponse,
        email,
      );
      return createTransactionResponse;
    }
    await this.logTransaction(
      messageId,
      'response-ceateUpdateInquiry-park',
      updateParkResponse.data,
      email,
    );

    if (updateParkResponse?.data?.Status !== 'Success') {
      createTransactionResponse.setWarning(
        `[park] ${updateParkResponse?.data?.Error[0].message}`,
      );
      await this.logTransaction(
        messageId,
        'response-TEST',
        createTransactionResponse,
        email,
      );
      return createTransactionResponse;
    }

    await this.logTransaction(
      messageId,
      'response-TEST',
      createTransactionResponse,
      email,
    );
    return createTransactionResponse;
  }
  getGenerateTransationInfoFromClone(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _InquiryInfo: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _transaction: Transaction,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createTransaction: CreateTransaction,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    salesRepAccountId: string,
  ): InquiryInfo {
    throw new Error('Method not implemented.');
  }

  private getGenerateUrlLink(ceateUpdateInquiryReponse: any): string {
    return `${process.env.SALES_FORCE_LINK}?InquiryNumber=${ceateUpdateInquiryReponse.data?.InquiryInfo?.Name}`;
  }

  public async logTransaction(
    messageId: string,
    tag: string,
    dataJson: any,
    email?: string,
    userAgent?: string,
  ) {
    return await this.logTransactionRepository.save({
      logTransactionId: messageId,
      tag: tag,
      data: JSON.stringify(dataJson),
      createdBy: email ? email : 'migration',
      userAgent: userAgent,
    });
  }
}
