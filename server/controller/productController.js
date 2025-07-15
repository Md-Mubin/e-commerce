const slugGenerator = require("../../../Extra Curriculum/e-commerce/server/helpers/slugGenerator")
const productSchema = require("../models/productSchema")

// ================== create product
const create_product = (req, res) => {

    try {
        const { title, description, price, stock, cetegory, veriants } = req.body

        if (!title) return res.status(400).send({ err: "Product Title Required" })
        if (!description) return res.status(400).send({ err: "Product Description Required" })
        if (!price) return res.status(400).send({ err: "Product Price Required" })
        if (!stock) return res.status(400).send({ err: "Product Stock Required" })
        if (veriants.length < 0) return res.status(400).send({ err: "Product Veriants Required" })

        // for chekcing image
        if (req?.file?.mainImg) return res.status(400).send({ err: "Product Main Image Required" })

        // generate slugs
        const generatedSlug = slugGenerator(title)

        // upload main image
        let productMainImg
        if (req?.file?.mainImg.length > 0) {
            for (item of req?.file?.mainImg) {
                const result = cloudinary.uploader.upload(item?.path, {
                    folder: "product"
                })
                fs.unlinkSync(item?.path)
                productMainImg = result.url
            }
        }

        // upload sub images
        let productSubImages = []
        if (req?.file?.subImgs.length > 0) {
            for (item of req?.file?.subImgs) {
                const result = cloudinary.uploader.upload(item?.path, {
                    folder: "product"
                })
                fs.unlinkSync(item?.path)
                productSubImages.push(result.url)
            }
        }

        if (!cetegory) return res.status(400).send({ err: "Product Cetegory Required" })

        // for veriants conditions
        veriants.forEach((items) => {
            if (!["color", "size"].includes(items.name)) {
                return res.status(400).send({ err: "Invalid Veriants Options" })
            }

            if (items.name === "color") {
                items.options.forEach(colorOption => {
                    if (!colorOption.hasOwnProperty("colorName")) {
                        return res.status(400).send({ err: "Veriant's Color Name is Required" })
                    }
                })
            }

            if (items.name === "size") {
                items?.options.forEach(sizeOption => {
                    if (!sizeOption.hasOwnProperty("allSizes")) {
                        return res.status(400).send({ err: "Veriant's Size is Required" })
                    }
                })
            }
        })

        const newProduct = new productSchema({
            title, slug: generatedSlug, description, price, stock, mainImg: productMainImg, subImgs: productSubImages, cetegory, veriants
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