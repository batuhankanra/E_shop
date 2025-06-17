import dotenv from 'dotenv'
import { ConfigProps } from '../typescript/props'

dotenv.config()

export const config:ConfigProps={
    PORT:process.env.PORT || '3001',
    DB_URL:process.env.DB_URL || "mongodb://localhost:27017/Teknoloji-Shop",
    JWT_SECRET:process.env.JWT_SECRET || '123',
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN || '1h'
}