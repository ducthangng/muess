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
    required: true
  },
  appId: {
    type: String,
    required: true
  },
  buyerId: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  proposedPrice: {
    type: String,
    required: true
  },
  licenseDetails: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  }
});

const proposalModel = model<Proposal & Document>('Proposal', proposalSchema);

export default proposalModel;
