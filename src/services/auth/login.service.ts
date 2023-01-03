import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from '@/errors';
import { User } from '@/models';

interface LoginInput {
  email: string;
  password: string;
}

class LoginService {
  async execute(data: LoginInput) {
    const foundUser = await User.findOne({ email: data.email }).exec();

    if (foundUser === null || !foundUser.active) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const match = await foundUser.comparePassword(data.password);

    if (!match) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          name: foundUser.name,
          email: foundUser.email,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.name,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    return { accessToken, refreshToken };
  }
}

export { LoginService };
