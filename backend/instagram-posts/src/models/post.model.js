import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        author: mongoose.Schema.Types.ObjectId,
        place: String,
        description: String,
        hashtags: String,
        image: String,
        likes: {
            type: mongoose.Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
