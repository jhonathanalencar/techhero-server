import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export { router };
