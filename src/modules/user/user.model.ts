import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword: (userPassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = <UserDocument>this;

  if (!user.isModified("password")) return next();

  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, genSalt);

  user.password = hashedPassword;

  next();
});

userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  const user = <UserDocument>this;

  return bcrypt.compare(userPassword, user.password).catch((e) => false);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
