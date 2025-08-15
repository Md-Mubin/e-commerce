const cartSchema = require("../models/cartSchema")
const productSchema = require("../models/productSchema")

// ============== adding product into cart part
const addTo_Cart = async (req, res) => {

    try {
        const { productID, SKU, quantity } = req.body

        if (!productID) return res.status(400).send({ err: "Cart didn't added. Try Again" })
        if (!SKU) return res.status(400).send({ err: "Product variant (SKU) required" })

        const product = await productSchema.findById(productID)
        if (!product) return res.status(400).send({ err: "Product not found" })

        for (let veriant of product.veriants) {
            if (!veriant.colorName || typeof veriant.colorName !== "string") return res.status(400).send({ err: "Must Have Valid Color Name" })
            if (!Array.isArray(veriant.sizes) || veriant.sizes.length < 0) return res.status(400).send({ err: "Must Have At Least 1 Size Name" })

            for (let size of veriant.sizes) {
                if (!["s", "m", "l", "xl", "2xl"].includes(size.sizeName)) return res.status(400).send({ err: "Must Have Valid Size Name" })
                if (size.SKU !== SKU) return res.status(400).send({ err: "Something Went Wrong" })
            }
        }

        let cart = await cartSchema.findOne({ userID: req?.user?.id })

        if (!cart) {
            cart = new cartSchema({
                userID: req?.user?.id,
                item: []
            })
        }

        let newIndex = cart.item.findIndex(data => data.itemID.toString() === productID && data.SKU === SKU)

        if (newIndex > -1) {
            cart.item[newIndex].itemQuantity += quantity
        } else {
            cart.item.push({ itemID: productID, SKU: SKU, itemQuantity: quantity })
        }

        await cart.save()
        res.status(200).send({ msg: "Product Added to Cart" })

    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ============== updating product from cart
const update_cart = async (req, res) => {

    try {
        const { productID, quantity } = req.user

        if (!productID) res.status(400).send({ err: "Product not found" })

        let cart = await cartSchema.findOne({ userID: req?.user?.id })

        if (!cart) return res.status(400).send({ err: "Sorry, cart not found" })

        let newIndex = cart.item.findIndex(data => data.itemID.toString() === productID)

        if (newIndex === -1) return res.status(400).send({ err: "Product Not Found" })

        cart.item[newIndex].itemQuantity = quantity

        await cart.save()
        res.status(200).send(cart)

    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ============== deleting cart from cart list
const delete_cart = async (req, res) => {

    try {
        const { productID } = req.params

        if (!productID) res.status(400).send({ err: "Product not found" })

        let cart = await cartSchema.findOne({ userID: req?.user?.id })

        if (!cart) return res.status(400).send({ err: "Sorry, cart not found" })

        const initialLength = cart?.item.length

        cart.item = cart.item.filter(data => data?.itemID.toString() !== productID)

        if (cart.item.length === initialLength) return res.status(400).send({ err: "Product Not Found" })

        await cart.save()
        res.status(200).send({ msg: "Cart Successfully Deleted" })

    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

module.exports = { addTo_Cart, update_cart, delete_cart }