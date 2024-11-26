import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';

export class ExampleException extends ApiException {
  /**
   * @returns ApiException
   */
  static notFound(): ApiException {
    throw new ApiException(100001, [], HttpStatus.OK);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static createError(error?: string[]): ApiException {
    throw new ApiException(100002, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static updateError(error?: string[]): ApiException {
    throw new ApiException(100003, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static deleteError(error?: string[]): ApiException {
    throw new ApiException(100004, error);
  }
}
