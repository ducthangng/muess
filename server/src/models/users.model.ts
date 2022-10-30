import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    x509Identity: {
      type: String,
      required: false,
      unique: true
    }
  },
  { _id: false }
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
