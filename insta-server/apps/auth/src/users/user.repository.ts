import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  QueryOptions,
} from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<User, '_id'>,
    options: SaveOptions = {},
  ): Promise<User> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save(options)).toJSON() as unknown as User;
  }

  async findOne(
    filterQuery: FilterQuery<User>,
    options: QueryOptions<User> = {},
  ): Promise<User | null> {
    const document = await this.model.findOne(
      filterQuery,
      {},
      { ...options, ...{ lean: true } },
    );

    if (!document)
      this.logger.warn(`Document not found with filterQuery`, filterQuery);

    return document;
  }

  async findOneById(
    filterQuery: FilterQuery<User>,
    options: QueryOptions<User> = {},
  ): Promise<User | null> {
    const document = await this.model.findById(
      filterQuery,
      {},
      { ...options, ...{ lean: true } },
    );

    if (!document)
      this.logger.warn(`Document not found with filterQuery`, filterQuery);

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    update: UpdateQuery<User>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`User not found with filterQuery:`, filterQuery);
      throw new NotFoundException('User not found.');
    }

    return document;
  }

  async upsert(filterQuery: FilterQuery<User>, document: Partial<User>) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<User>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async deleteOne(filter: FilterQuery<User>) {
    return this.model.findOneAndDelete(filter);
  }
}