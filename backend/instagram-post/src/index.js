import 'dotenv/config';

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
//import { ProtoGrpcType as AuthService } from '../proto/build/auth.service';
//import { ProtoGrpcType as PostService } from '../proto/build/post.service';
import PostController from './controllers/post.controller.js';

const host = process.env.HOST ? process.env.HOST : '0.0.0.0:9090';

function getServer() {
    const proto = grpc.loadPackageDefinition(
        protoLoader.loadSync('./proto/services/post.service.proto'),
    );

    const server = new grpc.Server();
    server.addService(proto.post.PostService.service, PostController);
    return server;
}

const server = getServer();
server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Server error: ${err.message}`);
    } else {
        console.log(`Server bound on port: ${port}`);
        server.start();
    }
});
