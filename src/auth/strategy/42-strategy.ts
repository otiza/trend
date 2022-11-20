import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-42';
import { VerifyCallback } from 'passport-oauth2';

import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        'u-s4t2ud-bb691ee7fbfd3a586f755e8dceb0e16fa9d2ac879097f346e57e7c1cdd8b2c34',
      clientSecret:
        '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',
      callbackURL: 'http://localhost:3000/auth/42/callback',
      scope: ['public'],
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.authService.validateUser({
      username: profile.username,
      email: profile.emails == undefined ? '' : profile.emails[0].value,
      bio: profile.displayName,
    });
    done(null, user);
  }
}
