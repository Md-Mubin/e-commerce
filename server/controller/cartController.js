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

        let newIndex = cart?.item.findIndex(data => data.itemID.toString() === productID)

        if (newIndex > -1) {
            cart?.item[newIndex].itemQuantity += quantity
        } else {
            cart?.item.push({ itemID: productID, itemQuantity: quantity })
        }
        
        cart.save()
        res.status(200).send({ msg: "Product Added to Cart" })
    
    } catch (error) {
        res.status(500).send({ err : "Server Error" })
    }
}

const update_cart = (req, res) => {

}

module.exports = { addTo_Cart, update_cart }