const express = require("express")
const { register, login, emailVarify, resetPass, forgetPass, update } = require("../../controller/authController")
const authMiddleware = require("../../middlewares/authMiddleware")
const upload = require("../../helpers/multer")
const authRoute = express.Router()

authRoute.post("/register", register)
authRoute.post("/login", login)
authRoute.post("/emailVerify", emailVarify)
authRoute.post("/resetPass", resetPass)
authRoute.post("/forgetPass", forgetPass)
authRoute.post("/update", authMiddleware, upload.single("avatar"), update)

module.exports = authRoute