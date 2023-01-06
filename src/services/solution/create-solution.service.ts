import { Solution } from '@/models';

interface CreateSolutionInput {
  answer: string;
  answerOwner: string;
  problemId: string;
}

class CreateSolutionService {
  async execute(data: CreateSolutionInput) {
    const solution = await Solution.create({
      answer: data.answer,
      answeredBy: data.answerOwner,
      answeredOn: data.problemId,
    });

    return { solution };
  }
}

export { CreateSolutionService };
