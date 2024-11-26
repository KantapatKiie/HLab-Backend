import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios from 'axios';

export class UserDetailResponse {
  message?: string;
  isValid?: boolean;
  application?: Application;
  service?: string;
  roles?: Role[];
  name?: string;
  email?: string;
}

export interface Application {
  name: string;
}

export interface Role {
  name: string;
  config: Config;
}

export interface Config {
  teamDisplay: string;
  teamKey: string;
  teamAdditionalPrompt?: string;
}

@Injectable()
export class AzureService {
  constructor() {}

  async getUserDetail(
    token: string,
    isSystem: boolean = false,
  ): Promise<AxiosResponse<UserDetailResponse>> {
    if (isSystem) {
      return axios.get(
        `${process.env.SSO_URL}/api/system/profile/${process.env.SSO_APPID}`,
        { headers: { Authorization: token } },
      );
    } else {
      return axios.get(
        `${process.env.SSO_URL}/api/profile/${process.env.SSO_APPID}`,
        { headers: { Authorization: token } },
      );
    }
  }

  public async getUserDetailAndValidateToken(token: string, isSystem: boolean) {
    const userDetailResponse: UserDetailResponse = new UserDetailResponse();

    try {
      const getUserDetailResponse = await this.getUserDetail(token, isSystem);

      if (getUserDetailResponse.status === 200) {
        if (!isSystem) {
          if (
            getUserDetailResponse.data &&
            getUserDetailResponse.data['email']
          ) {
            userDetailResponse.isValid = true;
            userDetailResponse.application =
              getUserDetailResponse.data.application;
            userDetailResponse.service = getUserDetailResponse.data.service;
            userDetailResponse.roles = getUserDetailResponse.data.roles;
            userDetailResponse.name = getUserDetailResponse.data.name;
            userDetailResponse.email = getUserDetailResponse.data.email;

            userDetailResponse.message = 'Success';
          } else {
            userDetailResponse.isValid = false;
            userDetailResponse.message = 'Un authorization';
          }
        } else {
          if (
            getUserDetailResponse.data &&
            getUserDetailResponse.data['token_name']
          ) {
            userDetailResponse.isValid = true;
            userDetailResponse.message = 'Success';
          } else {
            userDetailResponse.isValid = false;
            userDetailResponse.message = 'Un authorization';
          }
        }
        return userDetailResponse;
      } else {
        userDetailResponse.isValid = false;
        userDetailResponse.message =
          getUserDetailResponse.data['error_description'];
        return userDetailResponse;
      }
    } catch (error) {
      console.error(error.message);
      userDetailResponse.isValid = false;
      userDetailResponse.message = error.message;
      return userDetailResponse;
    }
  }
}
