import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import Post from '../model/post.model.js';

async function index(req, res) {
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
}

async function store(req, res) {
    const { place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({        
        place,
        description,
        hashtags,
        image: fileName,
    });

    req.io.emit('post', post);

    return res.json(post);
}

export default { store, index };
