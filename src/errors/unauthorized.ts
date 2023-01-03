import { CustomError } from './custom';

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export { UnauthorizedError };
