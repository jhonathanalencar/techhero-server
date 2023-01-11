import { Response, Request } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '@/errors';
import { UpdateSolutionService } from '@/services/solution';

const updateSolutionParams = z.object({
  id: z.string({
    required_error: 'Solution ID is required',
  }),
});

const updateSolutionBody = z.object({
  answer: z
    .string({
      required_error: 'Answer is required',
    })
    .trim()
    .min(1, 'Answer is required'),
});

class UpdateSolutionController {
  async handle(request: Request, response: Response) {
    const { id } = updateSolutionParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const { answer } = updateSolutionBody.parse(request.body);

    const service = new UpdateSolutionService();

    await service.execute({
      id,
      answer,
    });

    return response.status(204).send();
  }
}

export { UpdateSolutionController };
