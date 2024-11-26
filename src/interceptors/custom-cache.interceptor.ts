// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { CacheInterceptor } from '@nestjs/cache-manager';
// import { Observable } from 'rxjs';

//
// @Injectable()
// export class CustomCacheInterceptor extends CacheInterceptor {
//   // Override 'intercept' method to control caching behavior
//   intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//
//     // Example condition: skip caching if path is '/no-cache'
//     if (request.url.includes('/no-cache')) {
//       return next.handle(); // Skip caching
//     }
//
//     // Proceed with default caching behavior
//     return super.intercept(context, next);
//   }
// }
