import jwt from 'jsonwebtoken'; 

import { IUSER } from '../typescript/props'
import { config } from '../config'

export const generateToken=(user:IUSER):string=>{
    return (jwt as any).sign(
        { id:user._id },
        config.JWT_SECRET ,
        {
            expiresIn:config.JWT_EXPIRES_IN 
        }
    );
}