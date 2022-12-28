import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import 'express-async-errors';

import { connectDB } from './configs/dbConnect';
import { log } from './utils/log';

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
    log.error(
      `Could not connect to MongoDB for the following reason:\n${error.name}: ${error.message}`
    );
  } else {
    log.error('Could not connect to MongoDB!');
  }
});
