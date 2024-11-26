import { ApiProperty } from '@nestjs/swagger';

export class DefaultMasterResponse {
  @ApiProperty()
  value: string;

  @ApiProperty()
  label: string;
}
