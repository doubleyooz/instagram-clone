import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsRepository extends AbstractRepository<Post> {
  protected readonly logger = new this.logger(PostsRepository.name);

  constructor(
    @InjectModel(Post.name) postModel: Model<Post>,
    @InjectConnection() connection: Connection,
  ) {
    super(postModel, connection);
  }
}
