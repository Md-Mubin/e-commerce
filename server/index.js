require('dotenv').config()

const express = require("express")
const app = express()
const db = require('./config/db')
const cors = require("cors")
const router = require('./router')

app.use(express.json())
app.use(cors())
app.use(router)

db()

app.listen(8000, ()=>console.log("Server Connected"))