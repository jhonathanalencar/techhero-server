import { Router } from 'express';

import {
  CreateProblemController,
  GetProblemsController,
} from '@/controllers/problem';

const problemRoutes = Router();

problemRoutes.post('/', new CreateProblemController().handle);
problemRoutes.get('/', new GetProblemsController().handle);

export { problemRoutes };
