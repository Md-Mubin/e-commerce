const express = require("express")
const authRoute = require("./auth")
const apiRoute = express.Router()

apiRoute.use("/auth", authRoute)

module.exports = apiRoute