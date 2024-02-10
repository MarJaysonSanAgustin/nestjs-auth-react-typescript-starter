import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';

export interface TokenPayload {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatchPassword = await compare(password, user.password);
    if (user && isMatchPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<TokenPayload> {
    const token = await this.getToken(user);
    return { token };
  }

  private async getToken(user: User) {
    const payload = { email: user.email, id: user.id };
    const options: JwtSignOptions = {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      secret: process.env.JWT_REFRESH_SECRET,
    };
    return await this.jwtService.signAsync(payload, options);
  }
}
