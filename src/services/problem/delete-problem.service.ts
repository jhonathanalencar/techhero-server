import { NotFoundError } from '@/errors';
import { Problem, Solution } from '@/models';

interface DeleteProblemInput {
  id: string;
}

class DeleteProblemService {
  async execute(data: DeleteProblemInput) {
    const problem = await Problem.findById(data.id).exec();

    if (problem === null) {
      throw new NotFoundError('Problem not found');
    }

    if (problem.solution !== undefined) {
      const acceptedSolution = await Solution.findById(problem.solution).exec();

      if (acceptedSolution === null) {
        throw new NotFoundError('Problem solution not found');
      }

      acceptedSolution.accepted = false;

      await acceptedSolution.save();
    }

    await problem.deleteOne();
  }
}

export { DeleteProblemService };
