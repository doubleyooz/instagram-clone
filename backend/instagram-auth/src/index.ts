import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config'

//import io from 'socket.io';
import { app } from './config/express.config';

const server = require('http').Server(app);

mongoose.connect(process.env.DB_CONNECTION as string, {   
    useUnifiedTopology: true
   
} as ConnectOptions);

const PORT: number = parseInt(process.env.PORT as string, 10);
console.log(PORT)
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});