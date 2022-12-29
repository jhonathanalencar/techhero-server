import mongoose from 'mongoose';

interface IProblem {
  _id: string;
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  solution?: mongoose.Types.ObjectId;
  solved?: Date;
  solvedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema = new mongoose.Schema<IProblem>(
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
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model<IProblem>('Problem', ProblemSchema);

export { Problem, IProblem };
