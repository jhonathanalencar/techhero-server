import mongoose from 'mongoose';

async function connectDB() {
  mongoose.set('strictQuery', false);

  await mongoose.connect(process.env.MONGO_URI as string);
}

export { connectDB };
