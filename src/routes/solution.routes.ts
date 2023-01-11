import { Router } from 'express';

import {
  CreateSolutionController,
  UpdateSolutionController,
} from '@/controllers/solution';

const solutionRoutes = Router();

solutionRoutes.post('/', new CreateSolutionController().handle);

solutionRoutes.patch('/:id', new UpdateSolutionController().handle);

export { solutionRoutes };
