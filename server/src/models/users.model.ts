import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
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
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
