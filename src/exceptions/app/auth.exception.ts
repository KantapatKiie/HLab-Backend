import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';

export class AuthException extends ApiException {
  /**
   * @param error
   * @returns ApiException
   */
  static Unauthorized(error?: string[]): ApiException {
    throw new ApiException(900401, error, HttpStatus.UNAUTHORIZED);
  }

  static emailIsInvalidException(error?: string[]): ApiException {
    throw new ApiException(900402, error, HttpStatus.UNAUTHORIZED);
  }

  static guardUnAuthorizedException(error?: string[]): ApiException {
    throw new ApiException(900404, error, HttpStatus.UNAUTHORIZED);
  }
}
