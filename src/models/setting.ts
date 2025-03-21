import { Schema, model, models } from "mongoose";

// Define website settings schema
const websiteSettingsSchema = new Schema({
  title: { type: String, default: "SMB29 PTC" },
  description: { type: String, default: "Best PTC Site in Bangladesh" },
  logo: { type: String, default: "/logo1.jpg" }, // Default logo path
  paymentMethods: {
    bkash: {
       type: Number, 

     },
    nagad: { type: Number },
  },
  stats: {
    totalUsers: { type: Number, default: 0 },
    todayDeposits: { type: Number, default: 0 },
    todayWithdrawals: { type: Number, default: 0 },
  },
});

const WebsiteSetting = models?.WebsiteSetting || model("WebsiteSetting", websiteSettingsSchema);

export default WebsiteSetting;
