import { CustomError } from './custom';

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export { BadRequestError };
