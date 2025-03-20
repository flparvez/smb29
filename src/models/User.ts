import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// 🎯 User Interface
export interface IUser {
  name: string;
  number: number;
  balance: number;
  refer: string;
  referc: number;
  password: string;
  ads: boolean;
  admin: boolean;
  dailyLimit: number; // Daily ad limit
  adsWatchedToday: number; // Ads watched today
  referredBy?: mongoose.Types.ObjectId; // To track who referred this user
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// 🛠️ User Schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    balance: { type: Number, default: 100 },
    refer: { type: String, default: "" },
    referc: { type: Number, default: 0 }, // Total referral count
    password: { type: String, required: true },
    ads: { type: Boolean, default: false }, // User Plan status
    admin: { type: Boolean, default: false }, // Admin status

    dailyLimit: { type: Number, default: 0 }, // Default daily ad limit
    adsWatchedToday: { type: Number, default: 0 }, // Count reset daily

    // 🔗 Track referrer (optional)
    referredBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// 🔒 Hash Password Before Save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 🎯 Reset Daily Ads Limit at Midnight
userSchema.methods.resetDailyLimit = async function () {
  this.adsWatchedToday = 0;
  await this.save();
};

// ✅ Compare Passwords for Login
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🎉 Reward Referral
userSchema.methods.rewardReferral = async function () {
  if (this.referredBy) {
    const referrer = await User.findById(this.referredBy);
    if (referrer) {
      referrer.balance += 10; // 🎁 Reward referrer (10 Taka Bonus)
      referrer.referc += 1; // ➕ Increment referral count
      await referrer.save();
    }
  }
};

// 🔥 Generate Referral Code (Optional)
userSchema.methods.getReferralCode = function () {
  return this._id.toString();
};

// ⏳ Reset Ads Watched Count Daily (Cron job idea)
userSchema.statics.resetAllDailyLimits = async function () {
  await User.updateMany({}, { adsWatchedToday: 0 });
};

const User = models?.User || model<IUser>("User", userSchema);

export default User;
