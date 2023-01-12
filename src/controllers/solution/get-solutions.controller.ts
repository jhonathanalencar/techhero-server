import { Request, Response } from 'express';

import { GetSolutionsService } from '@/services/solution';

class GetSolutionsController {
  async handle(request: Request, response: Response) {
    const service = new GetSolutionsService();

    const { solutions } = await service.execute();

    return response.status(200).json(solutions);
  }
}

export { GetSolutionsController };
