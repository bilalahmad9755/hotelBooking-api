import {
  ExecutionContext,
  CanActivate,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request as RequestType } from 'express';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = AuthGuard.extractJWT(request);
    console.log("extracting token in guard: ", token);
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: 'secretkeybiwebvuervbreuvovberovrevo',
          ignoreExpiration: true,
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log("payload in authentication guard: ", payload);
      request['user'] = payload;
    } catch {
      console.log("user not verified in guard...");
      throw new UnauthorizedException();
    }
    return true;
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      console.log('extracting access_token in guard: ', req.cookies.access_token);
      return req.cookies.access_token;
    }
    return null;
  }

  private static validate(payload: any)
  {
    // validating user using database...
    return true;
  }
}
