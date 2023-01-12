import { Router } from 'express';

import { verifyJWT } from '@/middlewares/verifyJWT';

import {
  CreateSolutionController,
  DeleteSolutionController,
  GetSolutionsController,
  UpdateSolutionController,
} from '@/controllers/solution';

const solutionRoutes = Router();

solutionRoutes.use(verifyJWT);

solutionRoutes.post('/', new CreateSolutionController().handle);
solutionRoutes.get('/', new GetSolutionsController().handle);

solutionRoutes.patch('/:id', new UpdateSolutionController().handle);
solutionRoutes.delete('/:id', new DeleteSolutionController().handle);

export { solutionRoutes };
