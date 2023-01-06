import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { problemRoutes } from './problem.routes';
import { solutionRoutes } from './solution.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/problems', problemRoutes);
router.use('/solutions', solutionRoutes);

export { router };
