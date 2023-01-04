import { rateLimit } from 'express-rate-limit';

import { logEvents } from '@/utils';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      'Too many login attempts from this IP, please try again after a 60 second pause',
  },
  handler: (request, response, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
      'errorLog.log'
    );
    response.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { loginLimiter };
