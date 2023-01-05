import { Request, Response } from 'express';

import { GetProblemsService } from '@/services/problem';

class GetProblemsController {
  async handle(request: Request, response: Response) {
    const service = new GetProblemsService();

    const { problemsWithSolutions } = await service.execute();

    return response.status(200).json(problemsWithSolutions);
  }
}

export { GetProblemsController };
