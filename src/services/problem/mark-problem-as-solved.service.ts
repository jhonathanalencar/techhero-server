import { BadRequestError, NotFoundError } from '@/errors';
import { Problem, Solution } from '@/models';
import { Types } from 'mongoose';

interface MarkProblemAsSolvedInput {
  problemId: string;
  solutionId: String;
  solutionOwner: String;
}

class MarkProblemAsSolvedService {
  async execute(data: MarkProblemAsSolvedInput) {
    const problem = await Problem.findById(data.problemId).exec();

    if (problem === null) {
      throw new NotFoundError('Problem not found');
    }

    if (!problem.enabled) {
      throw new BadRequestError('Problem is unenabled');
    }

    const solution = await Solution.findById(data.solutionId).exec();

    if (solution === null) {
      throw new NotFoundError('Solution not found');
    }

    solution.accepted = true;

    problem.solved = new Date();
    problem.solvedBy = data.solutionOwner as unknown as Types.ObjectId;
    problem.solution = data.solutionId as unknown as Types.ObjectId;

    await Promise.all([solution.save(), problem.save()]);
  }
}

export { MarkProblemAsSolvedService };
