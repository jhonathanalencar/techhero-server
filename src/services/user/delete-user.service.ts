import { BadRequestError, NotFoundError } from '@/errors';
import { Problem, User } from '@/models';

interface DeleteUserInput {
  id: string;
}

class DeleteUserService {
  async execute(data: DeleteUserInput) {
    const problems = await Problem.find({ createdBy: data.id }).lean().exec();

    if (problems.length > 0) {
      throw new BadRequestError('User has assigned problems');
    }

    const user = await User.findById(data.id).exec();

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    await user.deleteOne();
  }
}

export { DeleteUserService };
