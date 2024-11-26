import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateTransactionItem {
  @ApiProperty()
  @IsOptional()
  transactionItemNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  materialCode: string;

  @IsOptional()
  @ApiProperty()
  class: string;

  @IsOptional()
  @ApiProperty()
  commission: number;

  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(100)
  sqType: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(250)
  remarkForApproval: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  loadDate: string;

  @IsOptional()
  @ApiProperty()
  endCustPriceUSD?: number;

  @IsOptional()
  @ApiProperty()
  diffPrice?: number;

  @IsOptional()
  @ApiProperty()
  exchangeRateForCh40?: number;

  @IsOptional()
  @ApiProperty()
  containerSize?: string;
}
export enum ActionType {
  CHECK = 'check',
  PARK = 'park',
}
export class CreateTransaction {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  @IsEnum(ActionType)
  actionType: ActionType;

  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  transactionNumber: string;

  @IsOptional()
  @ApiProperty()
  @MaxLength(50)
  salesPartnerCode: string;

  @IsOptional()
  @ApiProperty()
  customClearance: string;

  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(5)
  productionSite: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(5)
  sellingApproach: string;

  @IsOptional()
  @MaxLength(35)
  @ApiProperty({ required: false })
  poNumber: string;

  @IsOptional()
  @ApiProperty({ required: false })
  poDate: string;

  @IsOptional()
  @ApiProperty({ required: false })
  channel: string;

  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ required: false })
  paymentTerm: string;

  @ApiProperty()
  @IsOptional()
  etdDate: string;

  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  salesCoCode: string;

  @IsOptional()
  @ApiProperty({ required: true })
  currency: string;

  @IsOptional()
  @ApiProperty({ required: true })
  incoterms: string;

  @IsOptional()
  @ApiProperty()
  remarkForCS?: string;

  @IsOptional()
  @ApiProperty({ isArray: true, type: CreateTransactionItem })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTransactionItem)
  items: CreateTransactionItem[];
}
