const express = require("express")
const { addOrder } = require("../../controller/orderController")
const authMiddleware = require("../../middlewares/authMiddleware")
const orderRoute = express.Router()

orderRoute.post("/addOrder", addOrder)

module.exports = orderRoute