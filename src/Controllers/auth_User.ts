import { validationResult } from "express-validator";
import { Response, Request } from "express";
import User from "../Model/User";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, token } = req.body;
  try {
    let findUser = await User.findOne({ email });

    if (!name || !email || !password)
      throw new Error(`Faltan parametros obligatrios para el registro❌`);
    if (findUser) throw new Error(`Ya existe el usuario: ${email}`);

    const addUser = new User({ name, email, password, token });
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

export const loginUser = async (req: Request, res: Response) => {
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
    if (!user.confirmAccount)
      throw new Error(`Falta confirma la cuenta, verifique su correo`);
    return res.status(200).json({
      login: true,
      message: `Bienvenido ${user.name}🟢!!`,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      login: false,
      error: error.message,
    });
  }
};

export const confirmAccount = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ token });
    if (!user) throw new Error(`No existe este usuario`);
    user.confirmAccount = true;
    user.token = false;
    await user.save();
    return res.status(200).json({
      done: true,
      token,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      confirm: false,
      error: error.message,
    });
  }
};

export const allUsers = async (req: Request, res: Response) => {
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
