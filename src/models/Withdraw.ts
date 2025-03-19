import mongoose, { model, models, Schema } from "mongoose";

interface IWithdraw {
    id: number;
      user: {
        _id: mongoose.Types.ObjectId;
        name: string;
        number: string;
        ads: boolean;
    
        
      }
    amount: number;
    created_at?: string;
    updated_at?: string;
}

const withdrawSchema = new Schema<IWithdraw>({
    id: { type: Number, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Link to the User model
        required: true,
      },
    amount: { type: Number, required: true },

})

const Withdraw = models?.Withdraw || model<IWithdraw>("Plan", withdrawSchema);

export default Withdraw;