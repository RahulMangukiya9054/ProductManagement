import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  contractorType: { type: String },
  companyName: { type: String },
  phone: { type: String },
  email: { type: String },
  micsConNotes: { type: String },
  address1: { type: String, default: 'ra' },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  country: { type: String },
  empIdentiNumber: { type: String },
  licenseInfo: { type: String },
  insureanceInfo: { type: String },
  bondInfo: { type: String },
  mainUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' }, // ref: 'user'
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' }, // ref: 'user'
  isEnabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Number,
  isUpdated: Boolean,
  createdAt: { type: Date, default:  Date() },
  updatedAt: { type: Date, default:  Date() }
});
export default mongoose.model("contractor", contractorSchema);
