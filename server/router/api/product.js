const express = require("express")
const { createCetegory, fetchCetegories } = require("../../controller/cetegoryController")
const authMiddleware = require("../../middlewares/authMiddleware")
const chekingRoles = require("../../middlewares/cetegoryMiddleware")
const upload = require("../../helpers/multer")
const { create_product, fetch_allProduct, update_product, delete_product } = require("../../controller/productController")
const productRoute = express.Router()

// ============= cetegory part 
productRoute.post("/create_category",
    authMiddleware,
    chekingRoles(["admin"]),
    upload.single("Cetegory"),
    createCetegory)

productRoute.get("/allCetegories",
    authMiddleware,
    chekingRoles(["users", "admin", "stuffs"]),
    fetchCetegories)

// ============= product part 
productRoute.post("/create_product",
    authMiddleware,
    chekingRoles(["admin", "stuffs"]),
    upload.fields([{ name: "mainImg", maxCount: 1 }, { name: "subImgs", maxCount: 6 }]),
    create_product)

productRoute.post("/update_product/:slug",
    authMiddleware,
    chekingRoles(["admin", "stuffs"]),
    upload.fields([{ name: "mainImg", maxCount: 1 }, { name: "subImgs", maxCount: 6 }]),
    update_product)

productRoute.get("/allProduct",
    authMiddleware,
    chekingRoles(["users", "admin", "stuffs"]),
    fetch_allProduct)

productRoute.delete("/deleteProduct/:productID",
    authMiddleware,
    chekingRoles(["admin"]),
    delete_product)

module.exports = productRoute