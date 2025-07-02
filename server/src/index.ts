import cors from 'cors'
import express from 'express'
import { log } from './log/log';
import { config } from './config';
import { db } from './lib/db';
import passport from 'passport';
import routes from './routes/route';
import { requestLogger } from './middleware/requestLogger';
import './config/passport';
const app=express()

app.use(express.json())
app.use(cors({origin:'http://localhost:5173/'}))
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
db()

app.use(requestLogger);

app.use('/api',routes)
app.listen(config.PORT,()=>{
    log.info(`sucunu baslatiliyor-${config.PORT}`)
    
})