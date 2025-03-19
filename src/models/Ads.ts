import mongoose, { Schema, Document } from "mongoose";

// Define Ads Interface
export interface IAds extends Document {
  name: string;
  ads_link: string;
  user: mongoose.Types.ObjectId;
}

// Define Ads Schema
const AdsSchema: Schema = new Schema({
  name: { type: String, required: true },
  ads_link: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Ads = mongoose.models.Ads || mongoose.model<IAds>("Ads", AdsSchema);

export default Ads;
