import 'dotenv/config';

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
//import { ProtoGrpcType as AuthService } from '../proto/build/auth.service';
import { ProtoGrpcType as UserService } from '../proto/build/user.service';
import userController from './controllers/user.controller';

const host = process.env.HOST ? process.env.HOST : '0.0.0.0:9090';

function getServer(): grpc.Server {
    const proto = grpc.loadPackageDefinition(
        protoLoader.loadSync('./proto/services/user.service.proto'),
    ) as unknown as UserService;
    const server = new grpc.Server();
    server.addService(proto.users.UserService.service, userController);
    return server;
}

if (require.main === module) {
    const server = getServer();
    server.bindAsync(
        host,
        grpc.ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
            if (err) {
                console.error(`Server error: ${err.message}`);
            } else {
                console.log(`Server bound on port: ${port}`);
                server.start();
            }
        },
    );
}
