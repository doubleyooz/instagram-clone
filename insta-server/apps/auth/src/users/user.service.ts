import {
    Injectable,
    BadRequestException,
    NotFoundException,
    Logger,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { CreateUserDTO } from './dto/create.user.request.dto';
  import { UserRepository } from './user.repository';
  
  import { User } from './schemas/user.schema';
  import { FilterQuery, QueryOptions, Types } from 'mongoose';
  import { PasswordUtil } from '../utils/password.util';
  
  @Injectable()
  export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
      private readonly _repository: UserRepository,
      private readonly configService: ConfigService,
    ) {}
  
    async createUser(request: CreateUserDTO) {
      const session = await this._repository.startTransaction();
      try {
        const user = await this._repository.create({
          ...request,
          password: PasswordUtil.encrypt(
            request.password,
            this.configService.get<number>('HASH_SALT'),
          ),
        });
        await session.commitTransaction();
        delete user.password;
        delete user.tokenVersion;
        return user;
      } catch (err) {
        await session.abortTransaction();
        const msg = err.code === 11000 ? 'Email already in use.' : err.message;
        this.logger.warn(msg);
        throw new BadRequestException(msg);
      }
    }
  
    async findUserById(
      getUserArgs: Partial<User>,
      options: QueryOptions<User> = null,
    ) {
      this.logger.log(`Calling user repository findOneById()`);
      return this._repository.findOneById(getUserArgs, options);
    }
  
    async getUser(
      getUserArgs: Partial<User>,
      options: QueryOptions<User> = null,
    ) {
      if (typeof getUserArgs._id === 'string') {
        this.logger.log(`Converting informed _id to an objectId.`);
  
        getUserArgs._id = new Types.ObjectId(getUserArgs._id);
      }
  
      this.logger.log(`Calling user repository findOne()`);
      return this._repository.findOne(getUserArgs, options);
    }
  
    async findAllUsers(getUserArgs: {
      name?: {
        $regex: string;
        $options: string;
      };
    }): Promise<User[]> {
      this.logger.log(`Calling user repository findAll()`);
      return this._repository.find(getUserArgs);
    }
  
    async findUserAndUpdate(
      filterQuery: FilterQuery<User>,
      getUserArgs: Partial<User>,
    ): Promise<User> {
      const session = await this._repository.startTransaction();
      try {
        if (typeof filterQuery._id === 'string') {
          this.logger.log(`Converting informed _id to an objectId.`);
          filterQuery._id = new Types.ObjectId(filterQuery._id);
        }
  
        this.logger.log(`Calling user repository findOneAndUpdate()`);
        const updatedUser = await this._repository.findOneAndUpdate(
          filterQuery,
          getUserArgs,
        );
        await session.commitTransaction();
        return updatedUser;
      } catch (err) {
        await session.abortTransaction();
        this.logger.error(
          `A error occured while updating the user ${err.message}`,
        );
        throw err;
      }
    }
  
    async deleteById(filterQuery: FilterQuery<User>): Promise<void> {
      this.logger.log(`Calling user repository deleteOne()`);
      const result: User = await this._repository.deleteOne(filterQuery);
  
      if (!result) {
        this.logger.warn(`User not found or already removed: ${filterQuery._id}`);
        throw new NotFoundException('User not found or already removed.');
      }
    }
  }