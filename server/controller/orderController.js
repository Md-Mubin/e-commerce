const orderSchema = require("../models/orderSchema")
const productSchema = require("../models/productSchema")

// ================= adding order 
const addOrder = async (req, res) => {

    try {
        const { orderItems, shippinAddress, phone } = req.body

        if (!orderItems || orderItems.length < 1) return res.status(400).send({ err: "Order Items Required" })

        if (!shippinAddress) return res.status(400).send({ err: "Order Address Required" })
        if (!phone) return res.status(400).send({ err: "Phone Number Required" })

        let totalAmount = 0
        const populatedItem = []

        for (let item of orderItems) {
            const product = await productSchema.findById(item.productID)
            if (!product) return res.status(400).send({ err: "Product Not Found" })

            let itemPrice = product.price

            item.selectedVarients.forEach(veriants => {
                const productVeriant = product.veriants.find(ver => ver.name === veriants.name)

                if (productVeriant) {
                    const matchOption = productVeriant.options.find(opt => {
                        return opt.size === veriants.option
                    })

                    if (matchOption) {
                        itemPrice += matchOption.additionalPrice
                        item.price = itemPrice
                    }
                }
            })

            totalAmount += itemPrice * item.quantity

            populatedItem.push({
                product: item.product,
                quantity: item.quantity,
                selectedVarients: item.selectedVarients,
                price: itemPrice
            })
        }

        const newOrder = new orderSchema({
            orderItems,
            userID: req.user.id,
            shippinAddress,
            totalPrice: totalAmount
        })

        await newOrder.save()
        res.status(200).send({ msg: "Order Added", newOrder })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }

}

module.exports = { addOrder }