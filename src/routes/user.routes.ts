import express from 'express';
import { CreateUserController, GetUsersController } from '@/controllers/user';

const userRoutes = express.Router();

userRoutes.post('/users', new CreateUserController().handle);
userRoutes.get('/users', new GetUsersController().handle);

export { userRoutes };
