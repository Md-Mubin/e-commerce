const express = require("express")
const { register, login, emailVarify, resetPass, forgetPass, update } = require("../../controller/authController")
const authRoute = express.Router()

authRoute.post("/register", register)
authRoute.post("/login", login)
authRoute.post("/emailVerify", emailVarify)
authRoute.post("/resetPass", resetPass)
authRoute.post("/forgetPass", forgetPass)
authRoute.post("/update", update)

module.exports = authRoute