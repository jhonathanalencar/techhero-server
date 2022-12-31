import { User } from '@/models';

class GetUsersService {
  async execute() {
    const users = await User.find().select('-password').lean();

    return { users };
  }
}

export { GetUsersService };
