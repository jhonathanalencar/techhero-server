import express from 'express';
import {
  CreateUserController,
  GetUsersController,
  UpdateUserController,
} from '@/controllers/user';

const userRoutes = express.Router();

userRoutes.post('/users', new CreateUserController().handle);
userRoutes.get('/users', new GetUsersController().handle);

userRoutes.put('/users/:id', new UpdateUserController().handle);

export { userRoutes };
