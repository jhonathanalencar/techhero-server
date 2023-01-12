import { Router } from 'express';

import { verifyJWT } from '@/middlewares/verifyJWT';

import {
  CreateProblemController,
  GetProblemsController,
  UpdateProblemController,
  DeleteProblemController,
  MarkProblemAsSolvedController,
} from '@/controllers/problem';

const problemRoutes = Router();

problemRoutes.use(verifyJWT);

problemRoutes.post('/', new CreateProblemController().handle);
problemRoutes.get('/', new GetProblemsController().handle);

problemRoutes.put('/:id', new UpdateProblemController().handle);
problemRoutes.delete('/:id', new DeleteProblemController().handle);
problemRoutes.patch('/:id/solved', new MarkProblemAsSolvedController().handle);

export { problemRoutes };
