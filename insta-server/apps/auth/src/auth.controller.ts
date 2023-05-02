import {
  Body,
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  Res,
  Logger,
} from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { LoginDTO } from './dto/login.dto.request';
import { RefreshTokenGuard } from './guards/refresh.token.guard';
import { User } from './users/schemas/user.schema';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() request: LoginDTO,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User & { accessToken: string }> {
    this.logger.log(`Trying to log the user with this email: ${request.email}`);
    return this.authService.login(request, reply);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshAccessToken(@Req() request) {
    this.logger.log(
      `Retrieving a httpOnly cookie to generate a new accessToken.`,
    );
    return {
      accessToken: await this.authService.generateAccessToken(
        request.user._id,
        request.user.tokenVersion,
      ),
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  async logout(@Req() request, @Res() reply) {
    this.logger.log(`Revoking all tokens for: ${request.user._id}`);
    return this.authService.logout(request.user, reply);
  }
}
