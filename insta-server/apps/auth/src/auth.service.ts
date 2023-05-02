import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/schemas/user.schema';
import { UserService } from './users/user.service';
import { LoginDTO } from './dto/login.dto.request';
import { PasswordUtil } from './utils/password.util';
import { Types } from 'mongoose';

export interface JwtPayload {
  _id: Types.ObjectId;
  tokenVersion: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateAccessToken(
    _id: Types.ObjectId,
    tokenVersion: number,
  ): Promise<string> {
    this.logger.log(`Generating accessToken for: ${_id}`);
    return this.jwtService.signAsync(
      {
        _id,
        tokenVersion,
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
      },
    );
  }

  async generateRefreshToken(
    _id: Types.ObjectId,
    tokenVersion: number,
  ): Promise<string> {
    this.logger.log(`Generating refreshToken for: ${_id}`);
    return this.jwtService.signAsync(
      {
        _id,
        tokenVersion,
      },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
      },
    );
  }

  async login(
    request: LoginDTO,
    reply,
  ): Promise<User & { accessToken: string }> {
    this.logger.log(`Retrieving user with thil email: ${request.email}`);
    const user = await this.userService.getUser(
      { email: request.email },
      {
        projection: {
          name: 1,
          email: 1,
          tokenVersion: 1,
          password: 1,
        },
      },
    );

    if (!user) {
      this.logger.warn(`Access denied: User not found.`);
      throw new UnauthorizedException('Access denied.');
    }

    if (!PasswordUtil.isSamePassword(request.password, user.password)) {
      this.logger.warn(`Access denied: Wrong credentials.`);
      throw new UnauthorizedException('Access denied.');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user._id, user.tokenVersion),
      this.generateRefreshToken(user._id, user.tokenVersion),
    ]);

    this.logger.log(`User found. Setting up cookies...`);
    reply.setCookie('jid', refreshToken, {
      httpOnly: true,
      path: '/refresh-token',
      sameSite: 'strict',
    });

    reply.setCookie('jid', refreshToken, {
      httpOnly: true,
      path: '/logout',
      sameSite: 'strict',
    });

    delete user.password;
    delete user.tokenVersion;

    return { accessToken, ...user };
  }

  async validateJwtPayload(payload: JwtPayload): Promise<User> {
    const { _id, tokenVersion } = payload;
    this.logger.log(`Validating jwtPayload of received token: ${_id}`);
    const user = await this.userService.getUser({ _id, tokenVersion }, {});
    if (!user) {
      this.logger.warn(
        `Either user_id or tokenVersion received are not valid: Access Denied`,
      );
      throw new UnauthorizedException('Access Denied.');
    }
    return user;
  }

  async logout(payload: JwtPayload, reply): Promise<void> {
    await this.userService.findUserAndUpdate(
      { _id: payload._id },
      {
        tokenVersion: payload.tokenVersion + 1,
      },
    );
    this.logger.log(`Removing httpOnly cookie`);
    reply.clearCookie('jid');
  }
}
