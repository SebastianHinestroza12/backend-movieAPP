import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const { DB } = process.env;

mongoose
  .connect(`${DB}`, {})
  .then(() => console.log("Connection to Db established😀🍓"))
  .catch((err: string) => console.log(`Fallo la conexion a la db ${err}`));
