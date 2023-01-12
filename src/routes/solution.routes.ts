import { Router } from 'express';

import {
  CreateSolutionController,
  DeleteSolutionController,
  GetSolutionsController,
  UpdateSolutionController,
} from '@/controllers/solution';

const solutionRoutes = Router();

solutionRoutes.post('/', new CreateSolutionController().handle);
solutionRoutes.get('/', new GetSolutionsController().handle);

solutionRoutes.patch('/:id', new UpdateSolutionController().handle);
solutionRoutes.delete('/:id', new DeleteSolutionController().handle);

export { solutionRoutes };
