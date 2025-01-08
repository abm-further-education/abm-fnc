// models/user-model.ts

import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface MongoUser extends User, Document {}

export type TUser = User & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const UserSchema = new Schema<User>({
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

export const User = models.User || model<User>('User', UserSchema);
