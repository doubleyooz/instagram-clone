import express from 'express';
import cors from 'cors';
//import cookieParser from 'cookie-parser';

import postRoute from '../route/post.route.js';

import corsOptionsDelegate from './cors.config.js';
import limiter from './limiter.config.js';

//import { response } from '../middlewares/response.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static('uploads'));

//app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(limiter); // limiting all requests
//app.use(response);

app.use('/post', postRoute);

export { app };
