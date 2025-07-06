import cors from 'cors'
import express from 'express'
import { log } from './log/log';
import { config } from './config';
import { db } from './lib/db';
import passport from 'passport';
import routes from './routes/route';
import { requestLogger } from './middleware/requestLogger';
import './config/passport';
import cookieParser from 'cookie-parser';
const app=express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000", // frontend adresi
    credentials: true, // cookie için gerekli
  }))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
db()

app.use(requestLogger);

app.use('/api',routes)
app.listen(config.PORT,()=>{
    log.info(`sucunu baslatiliyor-${config.PORT}`)
    
})