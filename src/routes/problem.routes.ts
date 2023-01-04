import { CreateProblemController } from '@/controllers/problem';
import { Router } from 'express';

const problemRoutes = Router();

problemRoutes.post('/', new CreateProblemController().handle);

export { problemRoutes };
