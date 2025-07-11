const productSchema = require("../models/productSchema")

// ================== create product
const create_product = (req, res) => {

    try {
        const { title, description, price, stock, mainImg, cetegory, veriants } = req.body
    
        if (!title) return res.status(400).send({ err: "Product Title Required" })
        if (!description) return res.status(400).send({ err: "Product Description Required" })
        if (!price) return res.status(400).send({ err: "Product Price Required" })
        if (!stock) return res.status(400).send({ err: "Product Stock Required" })
        if (!mainImg) return res.status(400).send({ err: "Product Main Image Required" })
        if (!cetegory) return res.status(400).send({ err: "Product Cetegory Required" })
    
        const newProduct = new productSchema({
            title, description, price, stock, mainImg, cetegory, veriants
        })
    
        newProduct.save()
        res.status(200).send({ msg: "New Product Created Successfully" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ================== fetching all product
const fetch_allProduct = (req, res) => {

}

module.exports = { create_product, fetch_allProduct }