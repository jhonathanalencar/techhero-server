import pino from 'pino';
import { format } from 'date-fns';

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${format(new Date(), 'yy/MM/dd pp')}"`,
});

export { log };
