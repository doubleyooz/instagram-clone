import Post from '../models/post.model.js';

async function store(req, res) {
    const post = await Post.findById(req.params.id);
    /*
    if (!scan) {
        return res.jsonNotFound(null, getMessage('user.notfound'), new_token);
    }
    */

    const current_user = req.body._id;
    req.body._id = null;

    post.likes.includes(current_user)
        ? (post.likes = post.likes.filter(function (_id) {
              return _id.toString() !== current_user.toString();
          }))
        : post.likes.push(current_user);

    post.updatedAt = Date.now();

    let changes = post.getChanges();

    post.save()
        .then(() => {
            //call insta_auth
        })
        .catch(err => {
            console.log(err);
        
            res.status(500)
        return res.json(post);
           // return res.jsonServerError(null, null, err.toString());
        });

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
}

export default { store };
