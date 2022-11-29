import mongoose from "mongoose";
import { IMovie } from "../Interface";
const { Schema } = mongoose;

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  popularity: {
    type: Number,
  },
  release: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  poster_details: {
    type: String,
  },
  genres: {
    type: Array,
  },
  adult: {
    type: Boolean,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("movies", movieSchema);
