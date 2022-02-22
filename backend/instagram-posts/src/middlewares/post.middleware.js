import {object} from 'yup';

import { rules } from '../utils/yup.util.js';

async function valid_store(req, res, next) {
    let schema = object().shape({
       _id: rules._id,
       place: rules.place,
       description: rules.description,
       hashtags: rules.hashtags
    });

    schema
        .validate(req.body)
        .then(() => {
            if (req.file) {                
                next();
            } else {
                return res.jsonBadRequest(null, null, null);
            }
        })
        .catch(function (e) {
            console.log(e);
            return res.jsonBadRequest(null, null, e.path + ' : ' + e.message);
        });
}

export default { valid_store }