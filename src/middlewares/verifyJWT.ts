import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserRoles } from '@/models';

interface JwtPayload {
  userInfo: {
    name: string;
    email: string;
    roles: UserRoles[];
  };
}

function verifyJWT(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!(authHeader?.startsWith('Bearer ') ?? false)) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader?.split(' ')[1] as string;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err !== null) {
      return response.status(403).json({ error: 'Forbidden' });
    }

    request.user = (decoded as JwtPayload).userInfo;

    next();
  });
}

export { verifyJWT };
