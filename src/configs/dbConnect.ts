import mongoose from 'mongoose';

import { log } from '../utils/log';

async function connectDB() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    log.error(error);
  }
}

export { connectDB };
