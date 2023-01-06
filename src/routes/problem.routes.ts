import { Router } from 'express';

import {
  CreateProblemController,
  GetProblemsController,
  UpdateProblemController,
  DeleteProblemController,
} from '@/controllers/problem';

const problemRoutes = Router();

problemRoutes.post('/', new CreateProblemController().handle);
problemRoutes.get('/', new GetProblemsController().handle);

problemRoutes.put('/:id', new UpdateProblemController().handle);
problemRoutes.delete('/:id', new DeleteProblemController().handle);

export { problemRoutes };
