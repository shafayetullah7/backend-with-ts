import express from 'express';
import { userControllers } from './user.controller';

const userRouter = express.Router();

userRouter.post('/',userControllers.createUser);
userRouter.get('/',userControllers.getAllusers);
userRouter.get('/:userId',userControllers.getSingleUser);
userRouter.delete('/:userId',userControllers.deleteUser);
userRouter.put('/:userId',userControllers.updateUser);

// user orders
userRouter.put('/:userId/orders',userControllers.addOrder);
userRouter.get('/:userId/orders',userControllers.getAllOrdersOfUser);
userRouter.get('/:userId/orders/total-price',userControllers.getTotalPrice);

export default userRouter;