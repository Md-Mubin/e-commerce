const cartSchema = require("../models/cartSchema")

const addTo_Cart = async (req, res) => {

    try {
        const { productID, quantity } = req.body

        if (!productID) return res.status(400).send({ err: "Cart didn't added. Try Again" })

        let cart = await cartSchema.findOne({ userID: req?.user?.id })

        if (!cart) {
            cart = new cartSchema({
                userID: req?.user?.id,
                item: []
            })
        }

        let newIndex = cart?.item.findIndex(data => data?.itemID.toString() === productID)

        if (newIndex > -1) {
            cart?.item[newIndex].itemQuantity += quantity
        } else {
            cart?.item.push({ itemID: productID, itemQuantity: quantity })
        }

        cart.save()
        res.status(200).send({ msg: "Product Added to Cart" })

    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

const update_cart = async (req, res) => {

    try {
        const { productID, quantity } = req.user

        if (!productID) res.status(400).send({ err: "Product not found" })

        let cart = await cartSchema.findOne({ userID: req?.user?.id })

        if (!cart) return res.status(400).send({ err: "Sorry, cart not found" })

        let newIndex = cart?.item.findIndex(data => data?.itemID.toString() === productID)

        if (newIndex === -1) return res.status(400).send({ err: "Product Not Found" })

        cart?.item[newIndex].itemQuantity = quantity

        cart.save()

        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

const delete_cart = async (req, res) => {

    try {
        const { productID } = req.params
    
        if (!productID) res.status(400).send({ err: "Product not found" })
    
        let cart = await cartSchema.findOne({ userID: req?.user?.id })
    
        if (!cart) return res.status(400).send({ err: "Sorry, cart not found" })
    
        const initialLength = cart?.item.length
    
        cart?.item = cart?.item.filter(data => data?.itemID.toString() !== productID)
    
        if (cart?.item.length === initialLength) {
            return res.status(400).send({ err: "Product Not Found" })
        }
    
        await cart.save()
        res.status(200).send({ msg: "Cart Successfully Deleted" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

module.exports = { addTo_Cart, update_cart, delete_cart }