import { Problem } from '@/models';
import { BadRequestError, NotFoundError } from '@/errors';

interface UpdateProblemInput {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

class UpdateProblemService {
  async execute(data: UpdateProblemInput) {
    const problem = await Problem.findById(data.id).exec();

    if (problem === null) {
      throw new NotFoundError('Problem not found');
    }

    const duplicatedProblem = await Problem.findOne({ title: data.title })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (
      duplicatedProblem !== null &&
      duplicatedProblem._id.toString() !== problem.id
    ) {
      throw new BadRequestError('Duplicate problem title');
    }

    problem.title = data.title;
    problem.description = data.description;
    problem.enabled = data.enabled;

    await problem.save();
  }
}

export { UpdateProblemService };
