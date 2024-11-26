import { ApiHideProperty } from '@nestjs/swagger';

export class TransactionsHeaders {
  @ApiHideProperty()
  email: string;

  @ApiHideProperty()
  role?: string;

  @ApiHideProperty()
  userAgent?: string;
}
