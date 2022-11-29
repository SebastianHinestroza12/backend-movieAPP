import { validationResult } from "express-validator";
import { Response, Request } from "express";
import Movie from "../Model/Movie";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovie = await Movie.find();
    if (allMovie.length > 0) return res.status(200).json(allMovie);
    throw new Error("No movies found😣");
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      done: false,
      error: error.message,
    });
  }
};

export const findMovieId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movieId = await Movie.findById(id);
    if (!movieId) throw new Error(`Movie with id ${id} not found😶‍🌫️`);
    return res.status(200).json({
      done: true,
      movieId,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      done: false,
      error: error.message,
    });
  }
};

export const UpdateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Movie.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
      function (err, result) {
        if (err) throw new Error("Error al modificar los datos");
        return res.status(200).json({
          update: true,
          data: result,
        });
      }
    );
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      update: false,
      error: error.message,
    });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const {
    title,
    description,
    adult,
    rating,
    popularity,
    release,
    poster_path,
    poster_details,
    genres,
  } = req.body;

  try {
    const movie = await Movie.findOne({ title: title.trim() });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (movie) throw new Error(`Exist a movie with title ${title}`);

    const createMovie = new Movie({
      title,
      description,
      rating,
      poster_path,
      poster_details,
      genres,
      release,
      popularity,
      adult,
    });

    await createMovie.save((err, result) => {
      if (err) throw new Error("Error al crear la pélicula");
      return res.status(201).json({
        create: true,
        movie: result,
      });
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(400).json({
      create: false,
      error: error.message,
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteMovieId = await Movie.findByIdAndDelete(id);

    if (!deleteMovieId) throw new Error(`No found movie with id ${id}`);
    return res.status(200).json({
      delete: true,
      movie: deleteMovieId,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      delete: false,
      error: error.message,
    });
  }
};

// Filtros

export const filterByName = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const oneMovie = await Movie.find({ title: { $in: [name.trim()] } });

    if (!name) throw new Error(`Name is required for the consult`);
    if (oneMovie.length !== 0) {
      return res.status(200).json({
        done: true,
        movie: oneMovie,
      });
    }
    throw new Error(`No found movie ${name}`);
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      create: false,
      error: error.message,
    });
  }
};

export const filterGenres = async (req: Request, res: Response) => {
  const { genre } = req.body;
  try {
    const allGenres = await Movie.find({ genres: { $all: [genre.trim()] } });
    if (!genre) throw new Error("The genre  is reuqried");
    if (allGenres.length < 1)
      throw new Error(`No found movie with genre ${genre}`);
    return res.status(200).json({
      done: true,
      data: allGenres,
    });
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      create: false,
      error: error.message,
    });
  }
};

export const orderMovie = async (req: Request, res: Response) => {
  const { number } = req.body;
  try {
    const movieSort = await Movie.find().sort({ title: number });
    if (!number) throw new Error(`Insert number, 1 ascending -1 descending`);
    return res.status(200).json(movieSort);
  } catch (e) {
    let error = <Error>e;
    return res.status(404).json({
      create: false,
      error: error.message,
    });
  }
};
