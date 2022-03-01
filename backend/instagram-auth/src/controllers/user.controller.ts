import * as dotenv from 'dotenv';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';

import User, { IUser } from '../models/user.model';

import jwt from '../utils/jwt.util';

import { getMessage } from '../utils/message.util';
import { hashPassword } from '../utils/password.util';

import { UserResponse } from '../../proto/build/users/UserResponse';
import { UserRequest } from '../../proto/build/users/UserRequest';
import { FindOneRequest } from '../../proto/build/users/FindOneRequest';
import { UserServiceHandlers } from '../../proto/build/users/UserService';

async function create(
    call: ServerUnaryCall<UserRequest, UserResponse>,
    callback: sendUnaryData<UserResponse>,
) {
    const { email, password, name }: UserRequest = call.request;

    if (email && password) {
        const hash = await hashPassword(password);

        const p1 = new User({
            name: name,
            email: email,
            password: hash,
        });

        p1.save()
            .then(result => {
                return callback(null, {
                    user: { ...result.toObject(), _id: result._id },
                });
            })
            .catch(err => {
                console.log(err);
                return callback(null, { error: err });
            });
    } else {
        return callback(null, { error: getMessage('default.badRequest') });
    }
}

async function findOne(
    call: ServerUnaryCall<FindOneRequest, UserResponse>,
    callback: sendUnaryData<UserResponse>,
) {
    const { _id }: FindOneRequest = call.request;

    User.findById(_id)
        .then(doc => {
            if (!doc)
                return callback(null, {
                    error: getMessage('default.notfound'),
                });

            return callback(null, {
                user: { ...doc.toObject(), _id: doc._id },
            });
        })
        .catch(err => {
            return callback(null, { error: getMessage('default.serverError') });
        });
}

export default { create, findOne } as UserServiceHandlers;
