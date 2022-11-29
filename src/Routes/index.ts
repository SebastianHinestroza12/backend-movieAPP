import express from "express";
const router = express.Router();
import * as movieController from "../Controllers/auth_movies";
import * as userController from "../Controllers/auth_User";
import * as Validator from "../Middlewares/validatorMovie";

// Movies
router.get("/movies", movieController.getAllMovies);
router.get("/movies/:id", movieController.findMovieId);
router.put(
  "/movies/:id",
  Validator.updateValidator(),
  movieController.UpdateMovie
);
router.post("/movies", Validator.createMovie(), movieController.createMovie);
router.delete("/movies/:id", movieController.deleteMovie);

// Filter Movie
router.get("/search", movieController.filterByName);
router.get("/genres", movieController.filterGenres);

// Sorted Movie
router.get("/orderMovie", movieController.orderMovie);

// User

router.get("/users", userController.allUsers);
router.post(
  "/register",
  Validator.userValidator(),
  userController.registerUser
);
router.post("/login", Validator.loginValidator(), userController.loginUser);
router.get("/confirmAccount/:token", userController.confirmAccount);
export { router };
