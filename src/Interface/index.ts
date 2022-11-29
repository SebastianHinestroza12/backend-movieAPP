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

export interface IUser {
  name: string;
  email: string;
  password: string;
  tokenConfirm?: boolean;
  cuentaConfirmada?: boolean;
  avatar: string;
}
