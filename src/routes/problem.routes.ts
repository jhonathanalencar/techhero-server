import { Router } from 'express';

import {
  CreateProblemController,
  GetProblemsController,
  UpdateProblemController,
} from '@/controllers/problem';

const problemRoutes = Router();

problemRoutes.post('/', new CreateProblemController().handle);
problemRoutes.get('/', new GetProblemsController().handle);

problemRoutes.put('/:id', new UpdateProblemController().handle);

export { problemRoutes };
