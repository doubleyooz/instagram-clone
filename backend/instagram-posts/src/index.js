import mongoose from 'mongoose';
import http from 'http';
//import io from 'socket.io';

import { app } from './config/express.config.js';

const server = http.Server(app);

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(`${process.env.DB_CONNECTION}`, connectOptions);

server.listen(parseInt(`${process.env.PORT}`), () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
