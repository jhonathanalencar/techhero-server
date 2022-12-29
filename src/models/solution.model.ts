import mongoose from 'mongoose';

interface ISolution {
  _id: string;
  answer: string;
  answeredBy: mongoose.Types.ObjectId;
  answeredOn: mongoose.Types.ObjectId;
  accepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const solutionSchema = new mongoose.Schema<ISolution>(
  {
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    answeredOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: [true, 'Problem ID is required'],
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Solution = mongoose.model<ISolution>('Solution', solutionSchema);

export { Solution, ISolution };
