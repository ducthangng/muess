import { model, Schema, Document } from 'mongoose';
import { App } from '@interfaces/apps.interface';

const feedback: Schema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false
  },
  content: {
    type: String,
    required: false,
    unique: false
  }
});

const appSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  creatorId: {
    type: String,
    required: false
  },
  creatorName: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  rated: {
    type: String,
    required: true,
    unique: false
  },
  appType: {
    type: String,
    required: false
  },
  appPaymentMethod: {
    type: String,
    required: false
  },
  appCategories: {
    type: String,
    required: false
  },
  appTags: {
    type: [String],
    required: false
  },
  reviewer: {
    type: String,
    required: false
  },
  downloaded: {
    type: Number,
    required: false,
    default: 0
  },
  appIcon: {
    type: String,
    required: false
  },
  imageSrc: {
    type: String,
    required: false
  },
  feedbacks: {
    type: [feedback],
    required: false
  }
});

const appModel = model<App & Document>('App', appSchema);

export default appModel;
