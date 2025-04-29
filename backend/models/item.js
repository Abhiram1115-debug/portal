import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  contactDetails: {
    email: { type: String, required: true },
    // phone: { type: String }
  },
  category: { type: String, enum: ['lost', 'found'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'claimed'], default: 'pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
                