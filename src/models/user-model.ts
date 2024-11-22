// models/user-model.ts

import mongoose from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface MongoUser extends User, mongoose.Document {}

export type TUser = User & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
