import { Router } from 'express';

import { CreateSolutionController } from '@/controllers/solution';

const solutionRoutes = Router();

solutionRoutes.post('/', new CreateSolutionController().handle);

export { solutionRoutes };
