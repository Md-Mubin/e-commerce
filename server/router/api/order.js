const express = require("express")
const { addOrder } = require("../../controller/orderController")
const authMiddleware = require("../../middlewares/authMiddleware")
const orderRoute = express.Router()

apiRoute.post("/addOrder", addOrder)

module.exports = orderRoute