import express from 'express';

import UserController from '../controllers/user.controller';

//import { auth as Authorize} from '../middlewares/auth.middleware';
//import UserMiddleware from '../middlewares/user.middleware';

const router = express.Router();

router.post('/', UserController.create);
//router.get('/findOne', UserController.findOne);

//router.get('/', UserController.list);
//router.put('/', Authorize(),  UserController.update);

//router.delete('/', Authorize(), UserController.remove);

export default router;
