import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { Injectable } from '@nestjs/common';

export const JwtSecretTMP = 'secretkeybiwebvuervbreuvovberovrevo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: JwtSecretTMP,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      console.log("extracting access_token: ", req.cookies.access_token);
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    console.log("executing validate in strategy...", payload);
    return payload;
  }
}