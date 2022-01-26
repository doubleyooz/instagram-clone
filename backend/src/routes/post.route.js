import express from 'express';
import multer from 'multer';

import PostController from '../controllers/post.controller.js';
import LikeController from '../controllers/like.controller.js';
import files from '../config/multer.config.js';

const routes = express.Router();

const upload = multer(files);
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);
export default routes;
