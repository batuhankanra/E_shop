import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { log } from "../log/log";
import { config } from "../config";
import userService from "../services/user.service";


export const TokenVerification= async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
     res.status(401).json({ msg: 'Yetkilendirme yok' });
     return
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    const existingUser = await userService.findId(decoded.id);

    if (!existingUser) {
       res.status(403).json({ msg: 'Yetkiniz yok' });
       return
    }

    req.user = existingUser;
    next();
  } catch (err) {
    log.error('Auth Middleware Error');
     res.status(401).json({ msg: 'Geçersiz veya süresi dolmuş token' })
    return;
  }
};