import { model, Schema, Document } from 'mongoose';
import { Invoice } from '@/interfaces/invoices.interface';

const invoiceSchema: Schema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  buyerId: {
    type: String,
    required: false
  },
  sellerId: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: false
  },
  dateCreated: {
    type: Date,
    required: true
  }
});

const userModel = model<Invoice & Document>('Invoice', invoiceSchema);

export default userModel;
