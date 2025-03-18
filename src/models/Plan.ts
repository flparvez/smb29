import mongoose, { model, models, Schema } from "mongoose";

export interface IPlan {
    title: string;
    price: number;
    dailyAds: number;
    _id?: mongoose.Types.ObjectId;
    dailyIncome: number;
    validity: number;
      user: {
        _id: mongoose.Types.ObjectId;
        name: string;
        number: string;
        ads: boolean;
        admin: boolean;
        
      }
}

const PlanSchema = new Schema<IPlan>({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Link to the User model
        required: true,
      },
    price: {
        type: Number,
        required: true,
    },
    dailyAds: {
        type: Number,
        required: true,
    },
    dailyIncome: {
        type: Number,
        required: true,
    },
    validity: {
        type: Number,
        required: true,
    },
});

const Plan = models?.Plan || model<IPlan>("Plan", PlanSchema);

export default Plan;