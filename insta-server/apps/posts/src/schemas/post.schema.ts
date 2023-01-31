import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema()
export class Post extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
