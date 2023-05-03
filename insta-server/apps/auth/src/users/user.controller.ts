import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UnauthorizedException,
  UsePipes,
  Logger,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { UserService } from './user.service';
import { FindByIdDTO } from '@app/common';
import { AccessTokenGuard } from '../guards/access.token.guard';
import { JwtPayload } from '../auth.service';
import { PayloadPipe } from '../utils/pipes/payload.exist.pipe';
import { FindAllUsersDTO } from './dto/find.all.users.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly _service: UserService) {}

  @Post()
  async createUser(@Body() request: CreateUserDTO) {
    this.logger.log(`Creating a new user: ${JSON.stringify(request)}`);
    return await this._service.createUser(request);
  }

  @Get(':_id')
  async findOneUser(@Param() param: FindByIdDTO) {
    this.logger.log(`Finding the user that has this _id: ${param._id}`);
    const user = await this._service.findUserById(param);

    if (!user) {
      this.logger.warn(`User with ID ${param._id} not found`);
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Query() { name }: FindAllUsersDTO) {
    this.logger.log(
      `Finding all users with this query ${
        name ? '{name: ' + name + '' : '{}'
      }`,
    );
    return await this._service.findAllUsers(
      name ? { name: { $regex: name, $options: 'i' } } : {},
    );
  }

  @UseGuards(AccessTokenGuard)
  @UsePipes(PayloadPipe)
  @Put(':_id')
  async updateUser(
    @Param() filter: FindByIdDTO,
    @Body() body: UpdateUserDTO,
    @Req() request,
  ) {
    if (filter._id != request.user._id) {
      this.logger.warn(
        `Token _id and filter_id must match in order to proceed.`,
      );
      throw new UnauthorizedException(
        'Token _id and informed _id do not match.',
      );
    }
    this.logger.log(`Updating a user with this body: ${JSON.stringify(body)}`);
    return await this._service.findUserAndUpdate(filter, body);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':_id')
  async deleteUserById(@Param() filter: FindByIdDTO, @Req() request) {
    if (filter._id != request.user._id) {
      this.logger.warn(`User with ID ${filter._id} not found`);
      throw new UnauthorizedException(
        'Token _id and informed _id do not match.',
      );
    }
    this.logger.log(`Deleting a user with this _id: ${filter._id}`);
    return await this._service.deleteById(filter);
  }
}
