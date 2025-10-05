import { Router } from 'express';

import authRouter from './auth.ts';
import userRouter from './user.ts';
import habitRouter from './habit/habit.ts';


const v1Router = Router();

v1Router.use('/auth', authRouter)
v1Router.use('/user', userRouter);
v1Router.use('/habit', habitRouter)
v1Router.use('*rest', async (req, res) => {
    res.status(404).json({ message: 'not found' })
})

export { v1Router }
export default v1Router;