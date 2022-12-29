import mongoose from 'mongoose';

interface IProblem {
  _id: string;
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  solution?: mongoose.Types.ObjectId;
  solved?: Date;
  solvedBy?: mongoose.Types.ObjectId;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const problemSchema = new mongoose.Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solution',
    },
    solved: {
      type: Date,
    },
    solvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model<IProblem>('Problem', problemSchema);

export { Problem, IProblem };
