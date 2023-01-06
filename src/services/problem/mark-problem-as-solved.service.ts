import { BadRequestError, NotFoundError } from '@/errors';
import { Problem } from '@/models';
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

    problem.solved = new Date();
    problem.solvedBy = data.solutionOwner as unknown as Types.ObjectId;
    problem.solution = data.solutionId as unknown as Types.ObjectId;

    await problem.save();
  }
}

export { MarkProblemAsSolvedService };
