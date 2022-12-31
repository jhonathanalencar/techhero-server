import express from 'express';
import { CreateUserController } from '@/controllers/user';

const userRoutes = express.Router();

userRoutes.post('/users', new CreateUserController().handle);

export { userRoutes };
