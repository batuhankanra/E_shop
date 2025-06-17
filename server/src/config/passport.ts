import passport from "passport";
import { Strategy as JwtStrategy,ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import {config} from './index'
import { User } from "../models/User";
import { JwtPayload } from "../typescript/props";

const opts:StrategyOptions ={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.JWT_SECRET
}
passport.use(
  new JwtStrategy(opts, async (payload:JwtPayload, done:VerifiedCallback) => {
    try {
      const user = await User.findById(payload.id).select('-password');
      if (user) return done(null, user);
      else return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);