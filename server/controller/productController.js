const slugGenerator = require("../helpers/slugGenerator")
const productSchema = require("../models/productSchema")
const cloudinary = require("../helpers/cloudinary")
const fs = require("fs")
const searchFilter = require("../helpers/searchFIlter")
const cetegorySchema = require("../models/cetegorySchema")
const generateSKU = require("../helpers/generateSKU")

// ================== create product
const create_product = async (req, res) => {

    try {
        const { title, description, price, stock, cetegory, veriants } = req.body

        if (!title) return res.status(400).send({ err: "Product Title Required" })
        if (!description) return res.status(400).send({ err: "Product Description Required" })
        if (!price) return res.status(400).send({ err: "Product Price Required" })
        if (!stock) return res.status(400).send({ err: "Product Stock Required" })
        if (!Array.isArray(veriants) || veriants.length < 0) return res.status(400).send({ err: "Product Veriant Required" })

        // for chekcing image
        if (!req?.files?.mainImg) return res.status(400).send({ err: "Product Main Image Required" })

        // generate slugs
        const generatedSlug = await slugGenerator(title)

        // check if the product exists
        const existsProduct = await productSchema.findOne({ slug: generatedSlug })
        if (existsProduct) return res.status(400).send({ err: "Product Already Exists" })

        // upload main image
        let productMainImg
        if (req?.files?.mainImg.length > 0) {
            for (item of req?.files?.mainImg) {
                const result = await cloudinary.uploader.upload(item?.path, {
                    folder: "product"
                })

                fs.unlinkSync(item?.path)
                productMainImg = result.url
            }
        }

        // upload sub images
        let productSubImages = []
        if (req?.files?.subImgs.length > 0) {
            for (item of req?.files?.subImgs) {
                const result = await cloudinary.uploader.upload(item?.path, {
                    folder: "product"
                })
                fs.unlinkSync(item?.path)
                productSubImages.push(result.url)
            }
        }

        if (!cetegory) return res.status(400).send({ err: "Product Cetegory Required" })

        // for veriants conditions
        for (const items of veriants) {
            if (!items.colorName || typeof items.colorName !== "string") return res.status(400).send({ err: "Must Have Valid Color Name" })
            if (!Array.isArray(items.sizes) || items.sizes.length < 0) return res.status(400).send({ err: "Must Have At Least 1 Size Name" })

            for (const sizeItems of veriants.sizes) {
                if (!["s", "m", "l", "xl", "2xl"].includes(sizeItems.sizeName)) return res.status(400).send({ err: "Must Have Valid Size Name" })
                if (sizeItems.additionalPrice < 0 || typeof sizeItems.additionalPrice !== "number") return res.status(400).send({ err: "Must Have Valid Additional Price" })
                sizeItems.SKU = generateSKU(title, items.colorName, sizeItems.sizeName)
            }
        }

        const newProduct = new productSchema({
            title, slug: generatedSlug, description, price, stock, mainImg: productMainImg, subImgs: productSubImages, cetegory, veriants
        })

        newProduct.save()
        res.status(200).send({ msg: "New Product Created Successfully" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ================== updating product
const update_product = async (req, res) => {

    try {
        const { title, description, price, stock, veriants, status } = req.body
        const { slug } = req.params

        // check for product exists
        const existProduct = await productSchema.findOne({ slug })
        if (!existProduct) return res.status(400).send({ err: "Product is not Found" })

        // update if the reqest comes
        if (title) existProduct.title = title
        if (description) existProduct.description = description
        if (price) existProduct.price = price
        if (stock) existProduct.stock = stock
        if (veriants && veriants.length > 0) existProduct.veriants = veriants

        if (status && ["active", "pending", "reject"].includes(status.toLowerCase()) && req?.user?.role === "admin") {
            existProduct.status = status
        }

        // for update mainImage image
        let productMainImg
        if (req?.files?.mainImg.length > 0) {
            for (item of req?.files?.mainImg) {
                const result = cloudinary.uploader.upload(item?.path, {
                    folder: "product"
                })
                fs.unlinkSync(item?.path)
                productMainImg = result.url
            }
            existProduct.mainImg = productMainImg
        }

        // for update sub images
        let productSubImages = []
        if (req?.files?.subImgs.length > 0) {
            for (item of req?.files?.subImgs) {
                const result = cloudinary.uploader.upload(item?.path, {
                    folder: "product"
                })
                fs.unlinkSync(item?.path)
                productSubImages.push(result.url)
            }
            existProduct.subImgs = productSubImages
        }

        existProduct.save()
        res.status(200).send({ msg: "Product Updated Successfully" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ================== fetching all product
const fetch_allProduct = async (req, res) => {
    try {
        const search = req.query.search || "" // search with name
        const cetegoryName = req.query.cetegory || "" // search with cetegory
        const page = parseInt(req.query.page) || 1 // deafault first page
        const limit = parseInt(req.query.limit) || 10 // how many product will show in one page

        const totalProduct = await productSchema.countDocuments()
        const totalPage = Math.ceil(totalProduct / limit) // balanacing total page will be shown
        const skip = (page - 1) * limit // how many products will skip per page transition

        // query for the searches
        const query = {}

        if (search) {
            query.title = { $regex: searchFilter(search), $options: "i" }
        }
        if (cetegoryName) {
            const cetegoryData = await cetegorySchema.findOne({ cetegoryName: { $regex: searchFilter(cetegoryName), $options: "i" } })
            if (cetegoryData) query.cetegory = cetegoryData._id
        }

        // filtering product search
        const products = await productSchema.find(query).skip(skip).limit(limit).populate("cetegory")

        const hasPrevPage = page > 1
        const hasNextPage = page < totalPage

        res.send({
            products,
            totalProduct,
            limit,
            page,
            totalPage,
            hasPrevPage,
            hasNextPage,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
        })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ================== delete products
const delete_product = async (req, res) => {

    try {
        const { productID } = req.params
        if (!productID) return res.status(400).send({ err: "Something Went Wrong. Please Try Again!" })

        const deleteProduct = await productSchema.findByIdAndDelete(productID)
        if (!deleteProduct) return res.status(400).send({ err: "Something Went Wrong. Please Try Again!" })

        res.status(200).send({ msg: "Product Deleted Successfull" })
    } catch (error) {
        res.status(500).send({ msg: "Server Error" })
    }
}


module.exports = { create_product, update_product, fetch_allProduct, delete_product }