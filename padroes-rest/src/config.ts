import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const MONGODB_URL = String(process.env.MONGODB_URL)

export { PORT, MONGODB_URL }
