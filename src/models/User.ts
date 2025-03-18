import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    name : string;
    number : number;
    balance : number;
    refer : number;

  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  ads: boolean;
  admin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name : { type: String, required: true },
    number : { type: Number, required: true },
    balance : { type: Number, required: true, default: 100 },
    ads: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },

    password: { type: String, required: true },
    refer : { type: Number, }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;