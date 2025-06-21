const express = require("express")
const authRoute = require("./auth")
const productRoute = require("./product")
const apiRoute = express.Router()

apiRoute.use("/auth", authRoute)
apiRoute.use("/product", productRoute)

module.exports = apiRoute