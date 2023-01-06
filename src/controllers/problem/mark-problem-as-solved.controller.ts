import { BadRequestError } from '@/errors';
import { MarkProblemAsSolvedService } from '@/services/problem';
import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

const markProblemAsSolvedParams = z.object({
  id: z.string({
    required_error: 'Problem ID is required',
  }),
});

const markProblemAsSolvedBody = z.object({
  solutionId: z
    .string({
      required_error: 'Solution ID is required',
    })
    .trim()
    .min(1, 'Solution ID is required'),
  solutionOwner: z
    .string({
      required_error: 'Solution Owner ID is required',
    })
    .trim()
    .min(1, 'Solution Owner ID is required'),
});

class MarkProblemAsSolvedController {
  async handle(request: Request, response: Response) {
    const { id } = markProblemAsSolvedParams.parse(request.params);
    const { solutionId, solutionOwner } = markProblemAsSolvedBody.parse(
      request.body
    );

    if (
      !isValidObjectId(id) ||
      !isValidObjectId(solutionId) ||
      !isValidObjectId(solutionOwner)
    ) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new MarkProblemAsSolvedService();

    await service.execute({
      problemId: id,
      solutionId,
      solutionOwner,
    });

    return response.status(204).send();
  }
}

export { MarkProblemAsSolvedController };
