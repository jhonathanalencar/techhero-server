import { NotFoundError } from '@/errors';
import { Solution } from '@/models';

interface DeleteSolutionInput {
  id: string;
}

class DeleteSolutionService {
  async execute(data: DeleteSolutionInput) {
    const solution = await Solution.findById(data.id).exec();

    if (solution === null) {
      throw new NotFoundError('Solution not found');
    }

    await solution.deleteOne();
  }
}

export { DeleteSolutionService };
