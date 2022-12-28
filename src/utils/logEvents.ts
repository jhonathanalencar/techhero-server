import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import { log } from './log';

async function logEvents(message: string, logFilename: string) {
  const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsFolderPath = path.resolve(__dirname, '..', 'logs');

    if (!fs.existsSync(logsFolderPath)) {
      await fsPromises.mkdir(logsFolderPath);
    }

    await fsPromises.appendFile(
      path.join(logsFolderPath, logFilename),
      logItem
    );
  } catch (error) {
    log.error(error);
  }
}

export { logEvents };
