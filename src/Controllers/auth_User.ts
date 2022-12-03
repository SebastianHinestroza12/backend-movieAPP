import { validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";
import User from "../Model/User";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, surname, email, password, repitePassword } = req.body;
  try {
    let findUser = await User.findOne({ email });
    if (!name || !email || !password)
      throw new Error(`Faltan parametros obligatrios para el registro❌`);
    if (findUser) throw new Error(`Ya existe el usuario: ${email}`);
    if (password.trim() !== repitePassword.trim())
      throw new Error(`Las password no coinciden❌`);
    const addUser = new User({ name, email, password, surname });
    addUser.save((err, result) => {
      if (err) throw new Error(`Error al registrar al usuario`);
      return res.status(201).json({
        create: true,
        user: result,
      });
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      create: false,
      error: error.message,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error(`No existe el usuario con email : ${email}`);
    if (!(await user.comparePassword(password)))
      throw new Error(`password o email incorrecto❌`);
    // if (!user.confirmAccount)
    //   throw new Error(`Falta confirma la cuenta, verifique su correo`);
    const token = user.createToken();
    return res.status(200).json({
      login: true,
      user: {
        user,
      },
      message: `Bienvenido ${user.name}🟢!!`,
      token,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(400).json({
      login: false,
      error: error.message,
    });
  }
};

export const fortgotPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, newPassword, repiteNewPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error(`No existe un usuario con email ${email}❌`);
    if (newPassword.trim() !== repiteNewPassword.trim())
      throw new Error(`Las password no coinciden❌`);
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      modicado: true,
      user,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      moficado: false,
      error: error.message,
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        logout: true,
        message: "Session cerrada",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const allUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.find();
    if (!(user.length !== 0))
      throw new Error(`No tenemos usuarios registrados❌`);
    return res.status(200).json(user);
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      error: error.message,
    });
  }
};

export const rutaProtegida = async (req: Request, res: Response) => {
  try {
    return res.status(200).json("access");
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      error: error.message,
    });
  }
};
