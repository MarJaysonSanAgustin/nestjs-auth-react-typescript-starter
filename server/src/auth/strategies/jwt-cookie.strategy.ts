import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwtCookie') {
  constructor(configService: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refreshToken =
            request?.cookies[
              configService.get<string>('JWT_COOKIE_NAME') || 'token'
            ];
          if (!refreshToken) return null;

          return refreshToken;
        },
      ]),
    });
  }

  async validate(payload: any) {
    if (payload === null) throw new UnauthorizedException();

    return { id: payload.id, email: payload.email };
  }
}
