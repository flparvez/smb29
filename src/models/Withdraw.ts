import mongoose, { model, models, Schema } from "mongoose";

export interface IWithdraw {
  number: number; 
  pmethod: string;
  user: {
    _id: mongoose.Types.ObjectId;
    name: string;
    number: string;
    ads: boolean;
  };
  amount: number;
  approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

const withdrawSchema = new Schema<IWithdraw>(
  {
  number: { type: Number, required: true },
    pmethod: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User",  }, // Linked to User model
    approved: { type: Boolean, default: false },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Withdraw = models?.Withdraw || model<IWithdraw>("Withdraw", withdrawSchema);

export default Withdraw;
