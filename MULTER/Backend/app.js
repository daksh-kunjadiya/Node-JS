import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import { bookRoutes } from './src/routes/book.route.js'

const app = express()

dotenv.config({
    path: "./.env"
})

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/books', bookRoutes)

const port = process.env.PORT

connectDB();

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})