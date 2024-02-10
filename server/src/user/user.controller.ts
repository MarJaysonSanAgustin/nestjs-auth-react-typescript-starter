import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { JwtCookieAuthGuard } from '../auth/guards/jwt-cookie-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const doesUserExists = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (doesUserExists) throw new ConflictException('User already exists!');

    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Post('token')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<{ message: string }> {
    const { token } = await this.authService.login(req.user);
    res.cookie(
      this.configService.get<string>('JWT_COOKIE_NAME') || 'token',
      token,
      {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    );
    return { message: 'Login successful' };
  }

  @Delete('token')
  @UseGuards(JwtCookieAuthGuard)
  async deleteRefreshToken(
    @Response({ passthrough: true }) res,
  ): Promise<{ message: string }> {
    res.cookie(process.env.JWT_COOKIE_NAME || 'token', null, { maxAge: 0 });
    return { message: 'logged out successful' };
  }

  @Get(':id([0-9]+|me)')
  @UseGuards(JwtCookieAuthGuard)
  async findOne(
    @Param('id') id: string | number,
    @Request() req,
  ): Promise<User> {
    const user: User = req.user;
    if (!id || id === 'me') id = user.id;

    const foundUser = await this.userService.findOne(+id);
    if (!foundUser || foundUser.id !== user.id)
      throw new NotFoundException('User not found.');
    if (foundUser?.password) delete foundUser.password;

    return foundUser;
  }
}
