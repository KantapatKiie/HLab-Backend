import { Module } from '@nestjs/common';
import { AzureService } from './azure.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AzureService],
})
export class AuthenticationModule {}
