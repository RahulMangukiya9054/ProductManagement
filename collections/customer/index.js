import mongoose from 'mongoose';
 const customerSchema = new mongoose.Schema({
     firstName: { type: String },
     lastName: { type: String },
     companyName: { type: String },
     phone: { type: String },
     email: { type: String },
     password: { type: String },
     stripeId: { type: String },
     image: { type: String },
     loginToken: [
         {
             token: {
                 type: String,
             },
         },
     ],
     isEnabled: { type: Boolean, default: true },
     isDeleted: { type: Boolean, default: false },
     lastLoginDate: {type: Number},
     deletedAt: Number,
     isUpdated: Boolean,
     isMailVerified: { type: Boolean, default: false },
     createdAt: { type: Date, default:  Date()},
     updatedAt: { type: Date, default:  Date()}
 });

export default mongoose.model("customer", customerSchema);
