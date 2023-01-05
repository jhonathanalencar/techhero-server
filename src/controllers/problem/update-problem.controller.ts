import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { UpdateProblemService } from '@/services/problem';
import { BadRequestError } from '@/errors';

const updateProblemParams = z.object({
  id: z.string({
    required_error: 'Problem ID is required',
  }),
});

const updateProblemBody = z.object({
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
  enabled: z.boolean({
    required_error: 'Problem status is required',
  }),
});

class UpdateProblemController {
  async handle(request: Request, response: Response) {
    const { id } = updateProblemParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }
    const { description, title, enabled } = updateProblemBody.parse(
      request.body
    );

    const service = new UpdateProblemService();

    await service.execute({
      id,
      description,
      title,
      enabled,
    });

    return response.status(201).json({ message: 'Problem updated' });
  }
}

export { UpdateProblemController };
