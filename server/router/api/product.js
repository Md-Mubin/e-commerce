const express = require("express")
const { createCetegory, fetchCetegories } = require("../../controller/cetegoryController")
const productRoute = express.Router()

productRoute.post("/create_category", createCetegory)
productRoute.fet("/allCetegories", fetchCetegories)

module.exports = productRoute