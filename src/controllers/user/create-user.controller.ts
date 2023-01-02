import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateUserService } from '@/services/user';

const createUserBody = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .trim()
      .min(1, 'Name is required'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    roles: z.array(z.enum(['user', 'admin', 'manager'])).optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string({
      required_error: 'Password confirmation is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, name, password, roles } = createUserBody.parse(request.body);

    const service = new CreateUserService();

    const { user } = await service.execute({
      email,
      name,
      password,
      roles,
    });

    const { password: UserPassword, ...userWithoutPassword } = Object.assign(
      {},
      user.toJSON()
    );

    return response.status(201).json(userWithoutPassword);
  }
}

export { CreateUserController };
