import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';

export class ApiResource<T> {
  @ApiProperty({ type: Object, description: 'Status information' })
  status: { code: number; message: string };

  @ApiProperty({ type: Object, description: 'Data object', required: false })
  data?: T;

  @ApiProperty({
    type: Object,
    description: 'Pagination meta information',
    required: false,
  })
  links?: IPaginationMeta;

  @ApiProperty({
    type: Object,
    description: 'Pagination links information',
    required: false,
  })
  meta?: IPaginationLinks;

  static successResponse(data?: any): SuccessResponseInterface {
    if (!data) {
      return { status: { code: HttpStatus.OK, message: 'OK' } };
    }

    if (data.items) {
      const { items, links, meta } = data;

      return {
        data: items,
        links,
        meta,
        status: { code: HttpStatus.OK, message: 'OK' },
      };
    }

    return { data, status: { code: HttpStatus.OK, message: 'OK' } };
  }

  /**
   * Errors response
   * @param error
   */
  static errorResponse(error: Error): ErrorResponseInterface {
    // All exception will be handle by exception filters
    throw error;
  }

  static defaultErrorResponse(
    httpException: HttpException,
  ): ErrorResponseInterface {
    // All exception will be handle by exception filters
    return {
      status: { code: httpException.getStatus(), message: '' },
      error: {
        code: Number(`900${httpException?.getStatus()}`),
        message: httpException.getResponse().toString(),
      },
    };
  }
}
//
// export class ApiResource {
//   /**
//    * Success response
//    * @param [data]
//    * @returns SuccessResponseInterface
//    */
//   static successResponse(data?: any): SuccessResponseInterface {
//     if (!data) {
//       return { status: { code: HttpStatus.OK, message: 'OK' } };
//     }
//
//     if (data.items) {
//       const { items, links, meta } = data;
//
//       return {
//         data: items,
//         links,
//         meta,
//         status: { code: HttpStatus.OK, message: 'OK' },
//       };
//     }
//
//     return { data, status: { code: HttpStatus.OK, message: 'OK' } };
//   }
//
//   /**
//    * Errors response
//    * @param error
//    */
//   static errorResponse(error: Error): ErrorResponseInterface {
//     // All exception will be handle by exception filters
//     throw error;
//   }
//
//   static defaultErrorResponse(httpException: HttpException): ErrorResponseInterface {
//     // All exception will be handle by exception filters
//     return {
//       status: { code: httpException.getStatus(), message: "" },
//       error: { code: Number(`900${httpException?.getStatus()}`), message: httpException.getResponse().toString() }
//     }
//   }
//
// }
export interface SuccessResponseInterface {
  status: { code: number; message: string };
  data?: Record<string, unknown>;
  links?: IPaginationMeta;
  meta?: IPaginationLinks;
}

export interface ErrorResponseInterface {
  status: { code: number; message: string };
  error: { code: number; message: string; errors?: string[] };
}
