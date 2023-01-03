import { Router } from 'express';

import {
  CreateUserController,
  DeleteUserController,
  GetUsersController,
  UpdateUserController,
} from '@/controllers/user';

const userRoutes = Router();

userRoutes.post('/', new CreateUserController().handle);
userRoutes.get('/', new GetUsersController().handle);

userRoutes.put('/:id', new UpdateUserController().handle);
userRoutes.delete('/:id', new DeleteUserController().handle);

export { userRoutes };
