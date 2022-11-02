import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { Proposal } from '@/interfaces/hlf.interface';

const proposalSchema: Schema = new Schema({
  assetType: {
    type: String,
    require: true
  },
  assetId: {
    type: String,
    required: true,
    unique: true
  },
  appId: {
    type: String,
    required: true
  },
  buyerId: {
    type: String,
    required: false,
    unique: false
  },
  sellerId: {
    type: String,
    required: false
  },
  proposedPrice: {
    type: String,
    required: false,
    unique: true
  },
  licenseDetails: {
    type: String,
    required: false,
    unique: true
  },
  status: {
    type: String,
    required: false,
    unique: true
  }
});

const proposalModel = model<Proposal & Document>('Proposal', proposalSchema);

export default proposalModel;
