import { Document } from "mongoose";

export interface IMovie {
  title: string;
  description: string;
  rating: number;
  popularity?: number;
  release: string;
  poster_path: string;
  genres?: string[];
  poster_details: string;
  adult: boolean;
  date?: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  surname: string;
  token?: boolean;
  // confirmAccount?: boolean;
  avatar: string;
  comparePassword(password: string): Promise<boolean>;
  createToken(): string;
}
