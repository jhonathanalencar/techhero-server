import { NextFunction, Request, Response } from 'express';
import { logEvents } from '@/utils/logEvents';

function logger(request: Request, response: Response, next: NextFunction) {
  logEvents(
    `${request.method}\t${request.url}\t${
      request.headers.origin ?? 'undefined'
    }`,
    'requestLog.log'
  );
  console.log(`${request.method} ${request.path}`);

  next();
}

export { logger };
