import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.model<IUser>('User', UserSchema);
