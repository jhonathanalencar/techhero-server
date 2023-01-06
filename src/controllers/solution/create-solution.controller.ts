import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { CreateSolutionService } from '@/services/solution';

const createSolutionBody = z.object({
  answer: z
    .string({
      required_error: 'Answer is required',
    })
    .trim()
    .min(1, 'Answer is required'),
  answerOwner: z
    .string({
      required_error: 'Answer owner is required',
    })
    .trim()
    .min(1, 'Answer owner is required'),
  problemId: z
    .string({
      required_error: 'Problem ID is required',
    })
    .trim()
    .min(1, 'Problem ID is required'),
});

class CreateSolutionController {
  async handle(request: Request, response: Response) {
    const { answer, answerOwner, problemId } = createSolutionBody.parse(
      request.body
    );

    if (!isValidObjectId(answerOwner) || !isValidObjectId(problemId)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new CreateSolutionService();

    const { solution } = await service.execute({
      answer,
      answerOwner,
      problemId,
    });

    return response.status(201).json(solution);
  }
}

export { CreateSolutionController };
