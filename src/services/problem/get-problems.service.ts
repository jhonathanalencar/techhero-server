import { Problem, Solution } from '@/models';

class GetProblemsService {
  async execute() {
    const problems = await Problem.find().lean();

    const problemsWithSolutions = await Promise.all(
      problems.map(async (problem) => {
        const solutions = await Solution.find({ answeredOn: problem._id })
          .lean()
          .exec();

        return { ...problem, solutions };
      })
    );

    return { problemsWithSolutions };
  }
}

export { GetProblemsService };
