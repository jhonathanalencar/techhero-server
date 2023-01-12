import { CorsOptions } from 'cors';

import { allowedOrigins } from './allowedOrigins';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      (origin != null && allowedOrigins.includes(origin)) ||
      origin === undefined
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export { corsOptions };
