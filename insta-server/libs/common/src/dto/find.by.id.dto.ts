import { Types } from 'mongoose';
import { IsValidObjectId } from '../decorators/is.object.id.decorator';

export class FindByIdDTO {
  @IsValidObjectId()
  _id: Types.ObjectId;
}
