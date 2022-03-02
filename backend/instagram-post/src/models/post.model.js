import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        place: String,
        description: String,
        hashtags: String,
        image: String,
        likes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
