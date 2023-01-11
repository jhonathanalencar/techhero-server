import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { DeleteSolutionService } from '@/services/solution';

const deleteSolutionParams = z.object({
  id: z.string({
    required_error: 'Solution ID is required',
  }),
});

class DeleteSolutionController {
  async handle(request: Request, response: Response) {
    const { id } = deleteSolutionParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new DeleteSolutionService();

    await service.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteSolutionController };
