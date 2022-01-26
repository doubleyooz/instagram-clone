import Post from '../models/post.model.js';

async function store(req, res) {
    const post = await Post.findById(req.params.id);
    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
}

export default { store };
