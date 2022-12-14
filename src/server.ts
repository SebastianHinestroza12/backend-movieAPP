import express from "express";
import morgan from "morgan";
import { router } from "./Routes/index.routes";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./Database/db";
import "dotenv/config.js";
import { strategy } from "./Controllers/auth.passport";
const app = express();
const PORT: number = 3001;
const { SECRET_KEY } = process.env;

// MiddlewareStack
app.use(
  session({
    secret: `${SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
app.use("/", router);

app.listen(PORT, () =>
  console.log(`Server Corriendo En El Puerto ${PORT}🍓💻`)
);
