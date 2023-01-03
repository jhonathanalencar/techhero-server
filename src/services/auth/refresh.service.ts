import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from '@/errors';
import { User } from '@/models';

interface RefreshInput {
  email: string;
}

class RefreshService {
  async execute(data: RefreshInput) {
    const user = await User.findOne({
      email: data.email,
    });

    if (user === null) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    return { accessToken };
  }
}

export { RefreshService };
