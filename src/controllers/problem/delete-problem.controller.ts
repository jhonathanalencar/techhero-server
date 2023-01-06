import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { DeleteProblemService } from '@/services/problem';

const deleteProblemParams = z.object({
  id: z.string({
    required_error: 'Problem ID is required',
  }),
});

class DeleteProblemController {
  async handle(request: Request, response: Response) {
    const { id } = deleteProblemParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new DeleteProblemService();

    await service.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteProblemController };
