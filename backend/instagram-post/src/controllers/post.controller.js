import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import { treatImage, upload } from '../utils/image.util.js';

async function findOne(call, callback) {
    const { _id } = call.request;

    Post.findById(_id)
        .then(doc => {
            if (!doc)
                return callback(null, {
                    error: getMessage('default.notfound'),
                });

            return callback(null, {
                post: { ...doc.toObject(), _id: doc._id },
            });
        })
        .catch(err => {
            return callback(null, { error: getMessage('default.serverError') });
        });
}

async function find(call, callback) {
    Post.find()
        .sort('-createdAt')
        .then(result => {
            return callback(null, {
                posts: result,
            });
        })
        .catch(err => {
            return callback(null, { error: getMessage('default.serverError') });
        });
}

async function store(call, callback) {
    const { place, description, hashtags } = call.request;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    const res = new UploadImageResponse();
    const chunks = [];

    call.on(READABLE_STREAM_EVENT.DATA, chunk => {
        chunks.push(chunk.getBinary_asU8());
    });
    call.on(READABLE_STREAM_EVENT.END, async () => {
        const desiredSize = { width: 250, height: 250 }; // consider getting these values in request
        const imageBuff = Buffer.concat(chunks);
        const resized = await treatImage(
            imageBuff,
            desiredSize.width,
            desiredSize.height,
        );
        // you may want to replace this with a S3 pipe etc.
        await upload(resized, fileName);

        Post.create({
            place,
            description,
            hashtags,
            image: fileName,
        })
            .then(result => {
                callback(null, result);
            })
            .catch(e => {
                console.log(e);
                return callback(null, {
                    error: getMessage('default.serverError'),
                });
            });
    });
    call.on(READABLE_STREAM_EVENT.ERROR, err => {
        console.error(err);
        callback(err, res);
    });
}

export default { store, findOne, find };
