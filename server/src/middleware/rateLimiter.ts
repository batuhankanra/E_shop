import rateLimit from "express-rate-limit";


export const apiLimitter=rateLimit({
    windowMs:3 * 60 * 1000,
    max:100,
    message:{
        msg:'Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin.'
    },
    standardHeaders:true,
    legacyHeaders:false
})