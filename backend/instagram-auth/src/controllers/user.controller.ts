import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

import jwt from '../utils/jwt.util';
import { getMessage } from '../utils/message.util';
import { hashPassword } from '../utils/password.util';

async function create(req: Request, res: Response) {
    const { email, password }: IUser = req.body;

    if (email && password) {
        const hash = await hashPassword(password);

        const p1 = new User({
            email: email,
            password: hash,
        });

        p1.save()
            .then(result => {
                return res.jsonOK(
                    result,
                    getMessage('user.valid.sign_up.sucess'),
                    null,
                );
            })
            .catch(err => {
                console.log(err);
                if (err.name === 'MongoError' && err.code === 11000) {
                    //next(new Error('There was a duplicate key error'));
                    return res.jsonBadRequest(
                        null,
                        'There was a duplicate key error',
                        { err },
                    );
                } else {
                    return res.jsonBadRequest(null, null, { err });
                }
            });
    } else {
        return res.jsonBadRequest(null, getMessage('badRequest'), null);
    }
}

export default { create };
