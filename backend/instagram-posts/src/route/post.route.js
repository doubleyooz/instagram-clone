import express from 'express';
import multer from 'multer';

import PostController from '../controller/post.controller.js';
import LikeController from '../controller/like.controller.js';

import PostMiddleware from '../middleware/post.middleware.js';

import files from '../config/multer.config.js';

const routes = express.Router();

const upload = multer(files);
routes.get('/posts', PostController.index);
routes.post(
    '/posts',
    upload.single('image'),
    PostMiddleware.valid_store,
    PostController.store,
);

routes.post('/posts/:id/like', LikeController.store);
export default routes;
