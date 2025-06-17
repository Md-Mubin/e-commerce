const express = require("express")
const apiRoute = require("./api")
const router = express.Router()

router.use(process.env.API_URL, apiRoute)

module.exports = router