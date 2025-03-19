import mongoose, { Schema } from "mongoose";

export interface IAds {
    name: string;
    ads_link: string;
    _id?: mongoose.Types.ObjectId;
  
      user: {
        _id: mongoose.Types.ObjectId;
        name: string;
        number: string;
        ads: boolean;
      
        
      }
}

const AdsSchema = new Schema<IAds>({
    name: { type: String, required: true },
    ads_link: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Link to the User model
      required: true,
    },
  });
  
  const Ads = mongoose.models.Ads || mongoose.model<IAds>("Ads", AdsSchema);
  
  export default Ads;