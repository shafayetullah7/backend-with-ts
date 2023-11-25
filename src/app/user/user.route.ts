import express from 'express';
import { userControllers } from './user.controller';

const userRouter = express.Router();

userRouter.post('/',userControllers.createUser);
userRouter.get('/',userControllers.getAllusers);
userRouter.get('/:userId',userControllers.getSingleUser);

export default userRouter;