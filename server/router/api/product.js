const express = require("express")
const { createCetegory, fetchCetegories } = require("../../controller/cetegoryController")
const authMiddleware = require("../../middlewares/authMiddleware")
const chekingRoles = require("../../middlewares/cetegoryMiddleware")
const productRoute = express.Router()

productRoute.post("/create_category",authMiddleware, chekingRoles(["admin"]), createCetegory)
productRoute.fet("/allCetegories",authMiddleware, chekingRoles(["users", "admin", "stuffs"]), fetchCetegories)

module.exports = productRoute