require('dotenv').config()

const express = require("express")
const app = express()
const db = require('./config/db')
const cors = require("cors")

app.use(express.json())
app.use(cors())

db()

app.listen(8000, ()=>console.log("Server Connected"))