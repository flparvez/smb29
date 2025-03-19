import mongoose, { model, models, Schema } from "mongoose";

  export interface IWithdraw {
    id: number;
    number : number;
    pmethod: string;
      user: {
        _id: mongoose.Types.ObjectId;
        name: string;
        number: string;
        ads: boolean;
    
        
      }
    amount: number;
    approved?: boolean;
    created_at?: string;
    updated_at?: string;
}

const withdrawSchema = new Schema<IWithdraw>({
    id: { type: Number, required: true },
    number : { type: Number, required: true },
    pmethod: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Link to the User model
        required: true,
      },
      approved: { type: Boolean, default: false },
    amount: { type: Number, required: true },

})

const Withdraw = models?.Withdraw || model<IWithdraw>("Plan", withdrawSchema);

export default Withdraw;