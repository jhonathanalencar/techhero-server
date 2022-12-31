import { User } from '../../models/user.model';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute(data: CreateUserInput) {
    const duplicatedUser = await User.findOne({ email: data.email })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedUser !== null) {
      throw new Error('Duplicate email');
    }

    const user = await User.create(data);

    return { user };
  }
}

export { CreateUserService };
