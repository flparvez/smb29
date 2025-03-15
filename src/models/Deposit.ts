import mongoose, { model, models, Schema } from "mongoose";

export interface IDeposit {
  amount: number;
  method: string;
  trx: string;
  approved?: boolean;
  user: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const depostiSchema = new Schema<IDeposit>(
  {
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    trx: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Deposit = models?.Deposit || model<IDeposit>("Deposit", depostiSchema);

export default Deposit;