import { ApiProperty } from '@nestjs/swagger';

export enum CreateTransactionStatus {
  SUCCESS = 'success',
  Error = 'error',
  WARNING = 'warning',
}

export class CreateTransactionResponse {
  @ApiProperty()
  messageId: string;
  @ApiProperty()
  status: CreateTransactionStatus;
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  transactionNumber?: string;

  @ApiProperty({ required: false })
  urlLink?: string;

  setError(message: string) {
    this.message = message;
    this.status = CreateTransactionStatus.Error;
  }

  setWarning(message: string) {
    this.message = message;
    this.status = CreateTransactionStatus.WARNING;
  }
}

export class TransactionItem {
  @ApiProperty({
    description: 'The item number within the transaction.',
    example: '10',
  })
  transactionItemNumber: string;

  @ApiProperty({
    description: 'The unique identifier for the transaction item.',
    example: 'a0n6D000000DTANQA4',
  })
  transactionItemId: string;

  @ApiProperty({
    description: 'The material code.',
    example: 'Z10AF1881G1NS1250P',
  })
  materail: string;

  @ApiProperty({
    description: 'The material code (duplicate field, maybe a typo).',
    example: 'Z10AF1881G1NS1250P',
  })
  material: string;

  @ApiProperty({
    description: 'The grade of the material.',
    example: 'AF1881G1',
  })
  materialGrade: string;

  @ApiProperty({
    description: 'The material group code.',
    example: 'TG00',
  })
  materialGroup: string;

  @ApiProperty({
    description: 'The package code.',
    example: 'NS1250',
  })
  package: string;

  @ApiProperty({
    description: 'The color of the product.',
    example: 'NATURAL',
  })
  productColor: string;

  @ApiProperty({
    description: 'The subcategory of the product.',
    example: 'EL',
  })
  productSub: string;

  @ApiProperty({
    description: 'The application code for the product.',
    example: 'P09',
  })
  application: string;

  @ApiProperty({
    description: 'The product code.',
    example: 'PP',
  })
  product: string;

  @ApiProperty({
    description: 'The commission, if applicable.',
    example: 1,
    nullable: true,
  })
  commission: string | null;

  @ApiProperty({
    description: 'The quantity of the item.',
    example: 25,
  })
  quantity: number;

  @ApiProperty({
    description: 'The container size for the item, if applicable.',
    example: 1,
    nullable: true,
  })
  containerSize: string | null;

  @ApiProperty({
    description: 'The selling price of the item.',
    example: 140000,
  })
  sellingPrice: number;

  @ApiProperty({
    description: 'The class of the item.',
    example: 'P',
  })
  class: string;
}

export class Transaction {
  @ApiProperty({
    description: 'The unique identifier for the transaction.',
    example: '3010020747',
  })
  transactionNumber: string;

  @ApiProperty({
    description: 'The shipping address.',
    example: '2000239-บริษัท ทานตะวันอุตสาหกรรม จำกัด (มหาชน)',
  })
  shipTo: string;

  @ApiProperty({
    description: 'The name of the shipping company.',
    example: 'บริษัท ทานตะวันอุตสาหกรรม จำกัด (มหาชน)',
  })
  shipToName: string;

  @ApiProperty({
    description: 'The code for the shipping address.',
    example: '2000239',
  })
  shipToCode: string;

  @ApiProperty({
    description: 'The billing address.',
    example: '2000239-บริษัท ทานตะวันอุตสาหกรรม จำกัด (มหาชน)',
  })
  soldTo: string;

  @ApiProperty({
    description: 'The code for the billing address.',
    example: '2000239',
  })
  soldToCode: string;

  @ApiProperty({
    description: 'The sales contact person.',
    example: '10084351-ชลธิชา ขันธจิตร์',
  })
  salesCo: string;

  @ApiProperty({
    description: 'The code for the sales contact person.',
    example: '10084351',
  })
  salesCoCode: string;

  @ApiProperty({
    description: 'The approach used for selling.',
    example: 'S01',
  })
  sellingApproach: string;

  @ApiProperty({
    description: 'The name of the selling approach.',
    example: 'Direct Ship',
  })
  sellingApproachName: string;

  @ApiProperty({
    description: 'The production site code.',
    example: 'P03',
  })
  productionSite: string;

  @ApiProperty({
    description: 'The name of the production site.',
    example: 'TG/Other',
  })
  productionSiteName: string;

  @ApiProperty({
    description: 'The sales partner, if any.',
    nullable: true,
  })
  salesPartner: string | null;

  @ApiProperty({
    description: 'The name of the sales partner, if any.',
    nullable: true,
  })
  salesPartnerName: string | null;

  @ApiProperty({
    description: 'The payment terms code.',
    example: 'NT60',
  })
  paymentTerm: string;

  @ApiProperty({
    description: 'The name of the payment terms.',
    example: 'NT60 - Credit 60 days',
  })
  paymentTermName: string;

  @ApiProperty({
    description: 'The purchase order number, if any.',
    nullable: true,
  })
  poNumber: string | null;

  @ApiProperty({
    description: 'The date of the purchase order, if any.',
    nullable: true,
  })
  poDate: string | null;

  @ApiProperty({
    description: 'The sales channel code.',
    example: '40',
  })
  channel: string;

  @ApiProperty({
    description: 'The name of the sales channel.',
    example: '40 - Re-Export',
  })
  channelName: string;

  @ApiProperty({
    description: 'The group of the sales channel.',
    example: 'Domestic',
  })
  channelGroup: string;

  @ApiProperty({
    description: 'The end customer code.',
  })
  endCustomerCode: string;

  @ApiProperty({
    description: 'The end customer name.',
    example: '2000239-บริษัท ทานตะวันอุตสาหกรรม จำกัด (มหาชน)',
  })
  endCustomer: string;

  @ApiProperty({
    description: 'Customs clearance details, if any.',
    nullable: true,
  })
  customClearance: string | null;

  @ApiProperty({
    description: 'A short name for the transaction display.',
    example: '3010020747 / 1',
  })
  transactionShortnameDisplay: string;

  @ApiProperty({
    description: 'The currency code.',
    example: 'THB',
  })
  currency: string;

  @ApiProperty({
    description: 'The container size, if applicable.',
    nullable: true,
  })
  containerSize: string | null;

  @ApiProperty({
    description: 'Any remarks for customer service.',
    nullable: true,
  })
  remarkForCS: string | null;

  @ApiProperty({
    description: 'The incoterms used for the transaction.',
    example: 'CIF',
  })
  incoterms: string;

  @ApiProperty({
    description: 'The items associated with the transaction.',
    type: [TransactionItem],
  })
  items: TransactionItem[];

  @ApiProperty({
    description: 'The level of payment term.',
  })
  paymentTermLevel: number;

  @ApiProperty({
    description: 'The last modified date of the transaction.',
  })
  lastModifiedDate: string;
}
