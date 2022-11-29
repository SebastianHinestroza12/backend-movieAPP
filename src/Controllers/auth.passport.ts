import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../Model/User";
import "dotenv/config.js";

/* Una estrategia para pasaporte.js para autenticar al usuario. */

export const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWT_SECRET_KEY}`,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  }
);
