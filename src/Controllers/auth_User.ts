import { validationResult } from "express-validator";
import { Response, Request } from "express";
import User from "../Model/User";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    let findUser = await User.findOne({ email });

    if (!name || !email || !password)
      throw new Error(`Faltan parametros obligatrios para el registro❌`);
    if (findUser) throw new Error(`Ya existe el usuario: ${email}`);

    const addUser = new User({ name, email, password });
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
