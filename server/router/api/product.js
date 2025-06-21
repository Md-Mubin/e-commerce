const express = require("express")
const productRoute = express.Router()

productRoute.post("/create_category")

module.exports = productRoute