import express from 'express';
import {
  CreateUserController,
  DeleteUserController,
  GetUsersController,
  UpdateUserController,
} from '@/controllers/user';

const userRoutes = express.Router();

userRoutes.post('/users', new CreateUserController().handle);
userRoutes.get('/users', new GetUsersController().handle);

userRoutes.put('/users/:id', new UpdateUserController().handle);
userRoutes.delete('/users/:id', new DeleteUserController().handle);

export { userRoutes };
