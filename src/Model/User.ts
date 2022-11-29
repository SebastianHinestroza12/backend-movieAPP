import mongoose from "mongoose";
import { IUser } from "../Interface/index";
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

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
  tokenConfirm: {
    type: String,
    default: null,
  },
  cuentaConfirmada: {
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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error al codificar la contraseña");
  }
});
export default mongoose.model("User", userSchema);
