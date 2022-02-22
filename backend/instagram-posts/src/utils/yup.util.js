import mongoose from 'mongoose';
import yup from 'yup';

import { getMessage } from './message.util.js';

function isValidMongoIdRequired(value) {
    return (
        mongoose.Types.ObjectId.isValid(value) &&
        String(new mongoose.Types.ObjectId(value)) === value
    );
}

function isValidMongoId(value) {
    if (!!value) {
        mongoose.Types.ObjectId.isValid(value) &&
            String(new mongoose.Types.ObjectId(value)) === value;
    }
    return true;
}

const rules = {
    _id: yup
        .string()
        .test('isValidMongoId', getMessage('invalid.object.id'), value =>
            isValidMongoIdRequired(value),
        ),
    place: yup.string().min(1).max(15),
    description: yup.string().min(1).max(15),
    hashtags: yup.string().min(1).max(15),
};

export { rules }