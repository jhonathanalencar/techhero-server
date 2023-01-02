import { BadRequestError, NotFoundError } from '@/errors';
import { UserRoles, User } from '@/models/user.model';

interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  roles: UserRoles[];
  active: boolean;
}

class UpdateUserService {
  async execute(data: UpdateUserInput) {
    const user = await User.findById(data.id).exec();

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    const duplicatedUser = await User.findOne({ email: data.email })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedUser !== null && duplicatedUser._id.toString() !== data.id) {
      throw new BadRequestError('User with that email already exisits');
    }

    user.name = data.name;
    user.email = data.email;
    user.roles = data.roles;
    user.active = data.active;

    if (data.password !== null && data.password !== undefined) {
      user.password = data.password;
    }

    const updatedUser = await user.save();

    return { updatedUser };
  }
}

export { UpdateUserService };
