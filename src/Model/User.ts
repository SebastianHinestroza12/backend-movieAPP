import mongoose from "mongoose";
import { IUser } from "../Interface/index";
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const SALT_WORK_FACTOR: number = 10;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  confirmAccount: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error al codificar la contraseña");
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
