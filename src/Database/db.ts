import mongoose from "mongoose";
import "dotenv/config.js";

mongoose
  .connect(`${process.env.DB}`, {})
  .then(() => console.log("Connection to Db established😀🍓"))
  .catch((err: string) => console.log(`Fallo la conexion a la db ${err}`));
