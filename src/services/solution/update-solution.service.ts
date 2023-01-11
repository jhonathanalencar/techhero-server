import { NotFoundError } from '@/errors';
import { Solution } from '@/models';

interface UpdateSolutionInput {
  id: string;
  answer: string;
}

class UpdateSolutionService {
  async execute(data: UpdateSolutionInput) {
    const solution = await Solution.findById(data.id).exec();

    if (solution === null) {
      throw new NotFoundError('Solution not found');
    }

    solution.answer = data.answer;

    await solution.save();
  }
}

export { UpdateSolutionService };
