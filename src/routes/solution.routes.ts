import { Router } from 'express';

import {
  CreateSolutionController,
  DeleteSolutionController,
  UpdateSolutionController,
} from '@/controllers/solution';

const solutionRoutes = Router();

solutionRoutes.post('/', new CreateSolutionController().handle);

solutionRoutes.patch('/:id', new UpdateSolutionController().handle);
solutionRoutes.delete('/:id', new DeleteSolutionController().handle);

export { solutionRoutes };
