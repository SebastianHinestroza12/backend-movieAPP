import { body, ValidationChain } from "express-validator";

// Email validation

export const updateValidator = () => {
  const update: ValidationChain[] = [
    body("title")
      .trim()
      .isString()
      .withMessage("El titulo debe ser un string")
      .isLength({ min: 3, max: 100 })
      .withMessage(" Debe contener minimo 3 caracteres y maximo 100"),
    body("description")
      .trim()
      .isString()
      .withMessage("Debe ser un string")
      .isLength({ min: 10 })
      .withMessage(" Debe contener minimo 10 caracteres"),
    body("adult").trim().isBoolean().withMessage("Debe ser un valor boolean"),
    body("rating").trim().isInt().withMessage("Debe ser un numero"),
    body("release").isString().withMessage("Debe ser un string"),

    body("poster_path").isString().withMessage("Debe ser un string"),

    body("poster_details").isString().withMessage("Debe ser un string"),
  ];
  return update;
};

export const createMovie = () => {
  const create: ValidationChain[] = [
    body("title")
      .trim()
      .isString()
      .withMessage("El titulo debe ser un string")
      .notEmpty()
      .withMessage("El titulo es requerido")
      .isLength({ min: 3, max: 100 })
      .withMessage(" Debe contener minimo 3 caracteres y maximo 100"),
    body("description")
      .trim()
      .isString()
      .withMessage("Debe ser un string")
      .notEmpty()
      .withMessage("Description es requerida")
      .isLength({ min: 10 })
      .withMessage(" Debe contener minimo 10 caracteres"),
    body("adult").trim().isBoolean().withMessage("Debe ser un valor boolean"),
    body("rating")
      .trim()
      .isInt()
      .withMessage("Debe ser un numero")
      .notEmpty()
      .withMessage("Rating es requerida"),
    body("release").isString().withMessage("Debe ser un string"),

    body("poster_path")
      .isString()
      .withMessage("Debe ser un string")
      .notEmpty()
      .withMessage("Poster es requerido"),

    body("poster_details").isString().withMessage("Debe ser un string"),
    body("genres")
      .isArray()
      .withMessage("Debe ser un array de string")
      .notEmpty()
      .withMessage("Genres es requerido"),
  ];
  return create;
};

// USER VALIDATOR

export const userValidator = () => {
  const validatorUser: ValidationChain[] = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name es obligatorio")
      .isString()
      .withMessage("No se aceptan numeros, solo letras")
      .isLength({ min: 3, max: 20 })
      .withMessage(" Debe contener minimo 3 caracteres y maximo 20"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email es obligatorio")
      .isString()
      .withMessage("debe ser un string")
      .isEmail()
      .withMessage("Debe ser formato email, ejmplo : example@example.com")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password es obligatorio")
      .escape()
      .isLength({ min: 6 }),
  ];
  return validatorUser;
};
