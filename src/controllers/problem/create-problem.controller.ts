import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { CreateProblemService } from '@/services/problem';
import { BadRequestError } from '@/errors';

const createProblemBody = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, 'Title is required'),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .trim()
    .min(1, 'Description is required'),
  owner: z
    .string({
      required_error: 'User ID is required',
    })
    .trim()
    .min(1, 'User ID is required'),
});

class CreateProblemController {
  async handle(request: Request, response: Response) {
    const { description, title, owner } = createProblemBody.parse(request.body);

    if (!isValidObjectId(owner)) {
      throw new BadRequestError('User ID is not a valid Object ID');
    }

    const service = new CreateProblemService();

    const { problem } = await service.execute({
      title,
      description,
      owner,
    });

    return response.status(201).json(problem);
  }
}

export { CreateProblemController };
