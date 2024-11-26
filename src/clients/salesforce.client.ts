import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import {
  RequestCreateUpdateInquiry,
  RequestUpdateParkInquiry,
} from './salesforce.type';
import { SalesForceToken } from './salesforce-token.type';

@Injectable()
export class SalesforceClient {
  constructor(private readonly httpService: HttpService) {}

  public ceateUpdateInquiry(
    request: RequestCreateUpdateInquiry | RequestUpdateParkInquiry,
    token: string,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.post(
      `${process.env.SALES_FORCE_HOST_CREATE}`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  public getToken(): Observable<AxiosResponse<any>> {
    const salesForceToken = new SalesForceToken();
    salesForceToken.username = process.env.SALES_FORCE_USERNAME;
    salesForceToken.password = process.env.SALES_FORCE_PASSWORD;
    salesForceToken.client_id = process.env.SALES_FORCE_CLIENT_ID;
    salesForceToken.client_secret = process.env.SALES_FORCE_SECRET_ID;
    salesForceToken.grant_type = 'password';
    return this.httpService.post(
      `${process.env.SALES_FORCE_HOST_TOKEN}`,
      salesForceToken,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
