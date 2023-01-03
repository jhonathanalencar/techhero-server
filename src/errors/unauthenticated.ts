import { CustomError } from './custom';

class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export { UnauthenticatedError };
