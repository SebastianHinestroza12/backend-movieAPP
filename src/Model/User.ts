import mongoose from "mongoose";
import { IUser } from "../Interface/index";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const SALT_WORK_FACTOR: number = 10;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  surname: {
    type: String,
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
  avatar: {
    type: String,
    default: null,
  },
});

/* Este es un middleware que se ejecuta antes de que el usuario se guarde en la base de datos. */
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    /* Generando un salt para la contraseña. */
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error al codificar la contraseña");
  }
});

/* Este método se utiliza para comparar la contraseña que envía el usuario con la contraseña que está
almacenada en la base de datos. */
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

/* Crear un token para el usuario. */
userSchema.methods.createToken = function () {
  const user = this;
  return jwt.sign(
    { id: user.id, email: user.email },
    `${process.env.JWT_SECRET_KEY}`,
    { expiresIn: "1d" }
  );
};

export default mongoose.model("User", userSchema);
