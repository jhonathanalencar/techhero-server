import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthenticatedError, UnauthorizedError } from '@/errors';
import { RefreshService } from '@/services/auth';

interface JwtPayload {
  email: string;
}

class RefreshController {
  async handle(request: Request, response: Response) {
    const cookies = request.cookies;

    if (cookies?.jwt === undefined) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const refreshToken = cookies.jwt as string;

    const service = new RefreshService();

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err !== null) {
          throw new UnauthorizedError('Forbidden');
        }

        const { accessToken } = await service.execute({
          email: (decoded as JwtPayload).email,
        });

        response.status(200).json({ accessToken });
      }
    );
  }
}

export { RefreshController };
