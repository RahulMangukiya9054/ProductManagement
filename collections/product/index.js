import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String },
  productSKU: { type: String },
  productType: { type: String },
  companyName: { type: String },
  productPrice: { type: Number },
  mainUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  // stockStatus: { type: String, enum: ["inStock", "outStock"], default: "inStock" },
  // quantity: { type: Number, default: 1 },
  isEnabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Number },
  isUpdated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date() },
  updatedAt: { type: Date, default: Date() }
});

productSchema.index({productName:1,mainUserId:1})

export default mongoose.model("product", productSchema);
