const cetegorySchema = require("../models/cetegorySchema")
const cloudinary = require("../helpers/cloudinary")
const fs = require("fs")

// ==================== creating cetegory
const createCetegory = async (req, res) => {

    try {
        const { cetegoryName } = req.body
        if (!cetegoryName) return res.status(400).send({ err: "Cetegory Name Required!" })
        if (!req?.file?.path) return res.status(400).send({ err: "Cetegory Image Required!" })

        const result = await cloudinary.uploader.upload(req.file.path)
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
        re.status(200).send(allCetegories)
    } catch (error) {
        return res.status(500).send({ err: "Server Error" })
    }
}

module.exports = { createCetegory, fetchCetegories }