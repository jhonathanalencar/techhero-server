import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [6, 'Password must be at least 6 characters long, got {VALUE}'],
    },
    roles: {
      type: [String],
      enum: {
        values: ['admin', 'manager', 'user'],
        message: '{VALUE} is not supported',
      },
      default: ['user'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt
    .compare(candidatePassword, this.password)
    .catch(() => false);
};

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser };
