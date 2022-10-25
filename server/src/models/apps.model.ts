import { model, Schema, Document } from 'mongoose';
import { App } from '@interfaces/apps.interface';

const appSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  apptype: {
    type: String,
    required: true
  },
  payoption: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  }
});

const appModel = model<App & Document>('App', appSchema);

export default appModel;
