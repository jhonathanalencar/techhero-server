import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import 'express-async-errors';

import { connectDB } from './configs/dbConnect';
import { log } from './utils/log';
import { logEvents } from './utils/logEvents';

const app = express();

connectDB();

const PORT = process.env.PORT ?? 3333;

mongoose.connection.on('connected', () => {
  log.info('Connected to MongoDB');

  app.listen(PORT, () => {
    log.info(`Server is listening on port ${PORT}...`);
  });
});

mongoose.connection.on('error', (error) => {
  if (error instanceof Error) {
    logEvents(`${error.name}: ${error.message}`, 'mongoErrorLog.log');
  } else {
    logEvents(`Error: Could not connect to MongoDB`, 'mongoErrorLog.log');
  }
});
