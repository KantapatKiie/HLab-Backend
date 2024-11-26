// jwt.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthException } from '@exceptions/app/auth.exception';
import { AzureService } from '@modules/authentication/azure.service';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private readonly azureService: AzureService) {}

  async use(request: Request, _: Response, next: NextFunction) {
    let getUserDetail: any;
    try {
      const auth = request.headers?.authorization;
      getUserDetail = await this.azureService.getUserDetailAndValidateToken(
        auth,
        request.header('X-SYSTEM') && request.header('X-SYSTEM') === '1',
      );
      if (request?.headers) {
        request.headers = {
          ...request.headers,
          userAgent: request.headers['user-agent'] || '',
          email: getUserDetail.email,
          role: getUserDetail.roles?.find((value) => value.name === 'ADMIN')
            ? 'ADMIN'
            : 'USER',
        };
      }
      if (!getUserDetail.isValid)
        throw new UnauthorizedException(getUserDetail.message);
    } catch (error) {
      AuthException.Unauthorized();
    }
    next();
  }
}
