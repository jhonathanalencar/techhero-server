import { Router } from 'express';

import { LoginController, RefreshController } from '@/controllers/auth';

const authRoutes = Router();

authRoutes.post('/', new LoginController().handle);
authRoutes.get('/refresh', new RefreshController().handle);

export { authRoutes };
