import express from 'express';
import { userControllers } from './user.controller';

const userRouter = express.Router();

userRouter.post('/',userControllers.createUser);

export default userRouter;