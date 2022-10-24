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
  }
});

const appModel = model<App & Document>('App', appSchema);

export default appModel;