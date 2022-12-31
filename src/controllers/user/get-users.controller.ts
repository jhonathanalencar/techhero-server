import { Request, Response } from 'express';
import { GetUsersService } from '@/services/user';
import { NotFoundError } from '@/errors';

class GetUsersController {
  async handle(request: Request, response: Response) {
    const service = new GetUsersService();

    const { users } = await service.execute();

    if (users?.length === 0) {
      throw new NotFoundError('Users not found');
    }

    return response.status(200).json(users);
  }
}

export { GetUsersController };
