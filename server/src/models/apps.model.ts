import { model, Schema, Document } from 'mongoose';
import { App } from '@interfaces/apps.interface';

const appSchema: Schema = new Schema({
  assetId: {
    type: String,
    require: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    require: true
  },
  rating: {
    type: String,
    required: true
  },
  appType: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  appTags: {
    type: [String],
    required: true
  },
  appIconURL: {
    type: String,
    required: true
  },
  appCategories: {
    type: String,
    required: true
  }
});

const appModel = model<App & Document>('App', appSchema);

export default appModel;
