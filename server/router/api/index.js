const express = require("express")
const authRoute = require("./auth")
const productRoute = require("./product")
const orderRoute = require("./order")
const apiRoute = express.Router()

apiRoute.use("/auth", authRoute)
apiRoute.use("/product", productRoute)
apiRoute.use("/order", orderRoute)

module.exports = apiRoute