const express = require("express")
const { createCetegory, fetchCetegories } = require("../../controller/cetegoryController")
const authMiddleware = require("../../middlewares/authMiddleware")
const chekingRoles = require("../../middlewares/cetegoryMiddleware")
const upload = require("../../helpers/multer")
const { create_product, fetch_allProduct } = require("../../controller/productController")
const productRoute = express.Router()

productRoute.post("/create_category",authMiddleware, chekingRoles(["admin"]), upload.single("Cetegory"), createCetegory)
productRoute.get("/allCetegories",authMiddleware, chekingRoles(["users", "admin", "stuffs"]), fetchCetegories)

productRoute.post("/create_product", create_product)
productRoute.post("/allProduct", fetch_allProduct)

module.exports = productRoute