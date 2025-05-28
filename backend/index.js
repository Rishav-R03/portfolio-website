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

const PORT = process.env.PORT || 8000;  // Add fallback port
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// middlewares - serve static files from parent directory's public folder
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.static('files'))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

// server running
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)  // Use actual PORT variable
});