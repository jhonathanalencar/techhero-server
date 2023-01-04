import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { problemRoutes } from './problem.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/problems', problemRoutes);

export { router };
