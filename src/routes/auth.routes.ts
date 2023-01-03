import { Router } from 'express';

import {
  LoginController,
  LogoutController,
  RefreshController,
} from '@/controllers/auth';

const authRoutes = Router();

authRoutes.post('/', new LoginController().handle);
authRoutes.post('/refresh', new RefreshController().handle);
authRoutes.post('/logout', new LogoutController().handle);

export { authRoutes };
