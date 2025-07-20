const cetegorySchema = require("../models/cetegorySchema")
const cloudinary = require("../helpers/cloudinary")
const fs = require("fs")

// ==================== creating cetegory
const createCetegory = async (req, res) => {

    try {
        const { cetegoryName } = req.body

        const errors = {}
        if (!cetegoryName) errors.cetegoryNameError = "Cetegory Name Required!"

        // checking if the cetegory exists
        if (cetegoryName) {
            const existCetegory = await cetegorySchema.findOne({ name: { $regex: `${cetegoryName}`, $options: "i" } })
            if (existCetegory) errors.cetegoryNameError = "Cetegory is Already Exists"
        }

        if (!req?.file?.path) errors.cetegoryImageError = "Cetegory Image Required!"

        if (Object.keys(errors).length > 0) {
            return res.status(400).send({ errors })
        }

        const result = await cloudinary.uploader.upload(req.file.path, { folder: "Cetegory" })
        fs.unlinkSync(req.file.path)

        const newCetegory = new cetegorySchema({
            cetegoryName,
            cetegoryImage: result.url
        })

        newCetegory.save()
        res.status(200).send({ msg: "Cetegory Created Successfull!" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ==================== fetching cetegory
const fetchCetegories = async (req, res) => {
    try {
        const allCetegories = await cetegorySchema.find()
        if (!allCetegories) return res.status(400).send({ err: "No Cetegories Found" })
        res.status(200).send(allCetegories)
    } catch (error) {
        return res.status(500).send({ err: "Server Error" })
    }
}

module.exports = { createCetegory, fetchCetegories }