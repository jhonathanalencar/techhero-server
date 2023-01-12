import { Solution } from '@/models';

class GetSolutionsService {
  async execute() {
    const solutions = await Solution.find().lean();

    return { solutions };
  }
}

export { GetSolutionsService };
