import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { UpdateUserService } from '@/services/user';
import { BadRequestError } from '@/errors';

const updateUserParams = z.object({
  id: z.string({
    required_error: 'User ID is required',
  }),
});

const updateUserBody = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name is required'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .nullish(),
    confirmPassword: z.string().nullish(),
    roles: z
      .array(z.enum(['admin', 'manager', 'user']), {
        required_error: 'Roles is required',
      })
      .min(1, 'Roles must have at least one role'),
    active: z.boolean({
      required_error: 'Active is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = updateUserParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const { name, email, password, roles, active } = updateUserBody.parse(
      request.body
    );

    const service = new UpdateUserService();

    const { updatedUser } = await service.execute({
      id,
      name,
      email,
      password,
      roles,
      active,
    });

    const {
      comparePassword,
      password: userPassword,
      ...userWithoutPassword
    } = Object.assign({}, updatedUser.toJSON());

    return response.status(201).json(userWithoutPassword);
  }
}

export { UpdateUserController };
