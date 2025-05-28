import express from 'express'
import conn from './database.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

//connecting database
conn()
//configuring .env file
dotenv.config()

// import mongoose from 'mongoose'
const PORT = process.env.PORT;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// middlewares 

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('files'))
app.use(express.json())
// importing the database connection
conn()



// server running
app.listen(PORT, () => {
    console.log(`server running at http://localhost:8000`)
});
