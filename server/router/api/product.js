const express = require("express")
const { createCetegory, fetchCetegories } = require("../../controller/cetegoryController")
const authMiddleware = require("../../middlewares/authMiddleware")
const chekingRoles = require("../../middlewares/cetegoryMiddleware")
const upload = require("../../helpers/multer")
const { create_product, fetch_allProduct, update_product, delete_product } = require("../../controller/productController")
const productRoute = express.Router()

productRoute.post("/create_category", authMiddleware, chekingRoles(["admin"]), upload.single("Cetegory"), createCetegory)
productRoute.get("/allCetegories", authMiddleware, chekingRoles(["users", "admin", "stuffs"]), fetchCetegories)

productRoute.post("/create_product", upload.fields([{ name: "mainImg", maxCount: 1 }, { name: "subImgs", maxCount: 6 }]), create_product)
productRoute.post("/update_product/:slug", upload.fields([{ name: "mainImg", maxCount: 1 }, { name: "subImgs", maxCount: 6 }]), update_product)
productRoute.get("/allProduct", fetch_allProduct)
productRoute.delete("/deleteProduct/:productID", delete_product)

module.exports = productRoute