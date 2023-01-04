import { BadRequestError } from '@/errors';
import { Problem } from '@/models';

interface CreateProblemInput {
  title: string;
  description: string;
  owner: string;
}

class CreateProblemService {
  async execute(data: CreateProblemInput) {
    const duplicatedProblem = await Problem.findOne({ title: data.title })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedProblem !== null) {
      throw new BadRequestError('Duplicate problem title');
    }

    const problem = await Problem.create(data);

    return { problem };
  }
}

export { CreateProblemService };
