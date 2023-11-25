import express from 'express';
import { userControllers } from './user.controller';

const userRouter = express.Router();

userRouter.post('/',userControllers.createUser);
userRouter.get('/',userControllers.getAllusers);
userRouter.get('/:userId',userControllers.getSingleUser);
userRouter.delete('/:userId',userControllers.deleteUser);
userRouter.put('/:userId',userControllers.updateUser);

export default userRouter;