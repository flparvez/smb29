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
  dailyLimit: number;
  adsWatchedToday: number;
  planStartedAt?: Date; // Track when the user bought the plan
  referredBy?: mongoose.Types.ObjectId;
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
    referc: { type: Number, default: 0 },
    password: { type: String, required: true },
    ads: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    dailyLimit: { type: Number, default: 0 },
    adsWatchedToday: { type: Number, default: 0 },

    // Track when user starts the plan
    planStartedAt: { type: Date },

    // Optional: Referral tracking
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

// ✅ Compare Passwords for Login
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🎉 Reward Referral (10% of deposit amount)
userSchema.methods.rewardReferral = async function (depositAmount: number) {
  if (this.referredBy) {
    const referrer = await User.findById(this.referredBy);
    if (referrer) {
      const reward = (depositAmount * 10) / 100;
      referrer.balance += reward;
      referrer.referc += 1;
      await referrer.save();
    }
  }
};

// 🔥 Generate Referral Code (Optional)
userSchema.methods.getReferralCode = function () {
  return this._id.toString();
};

// ⏳ Reset Ads Watched Count After 24 Hours of Plan Start
userSchema.statics.resetUserDailyAds = async function (userId) {
  const user = await this.findById(userId);

  if (!user || !user.planStartedAt) return;

  const now = new Date();
  const timePassed = (now.getTime() - user.planStartedAt.getTime()) / (1000 * 60 * 60); // Time passed in hours

  // Reset daily ads if 24 hours have passed
  if (timePassed >= 24) {
    user.adsWatchedToday = 0;
    user.planStartedAt = now; // Reset the timer to now for the next cycle
    await user.save();
  }
};

// 🌟 Reset All Users' Daily Ads Limits (Cron job support)
userSchema.statics.resetAllDailyLimits = async function () {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  await User.updateMany(
    { planStartedAt: { $lte: twentyFourHoursAgo } },
    { adsWatchedToday: 0, planStartedAt: now }
  );

  console.log("✅ Daily ad limits reset for all eligible users!");
};

const User = models?.User || model<IUser>("User", userSchema);

export default User;
