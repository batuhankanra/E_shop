import cors from 'cors'
import express from 'express'
import { log } from './log/log';
import { config } from './config';
import { db } from './lib/db';
import morgan from 'morgan';
import routes from './routes/categories.route';
import { requestLogger } from './middleware/requestLogger';

const app=express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
db()

app.use(requestLogger);

app.use('/api',routes)
app.listen(config.PORT,()=>{
    log.info(`sucunu baslatiliyor-${config.PORT}`)
    
})