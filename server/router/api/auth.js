const express = require("express")
const { register, login, emailVarify, resetPass, forgetPass, update } = require("../../controller/authController")
const authMiddleware = require("../../middlewares/authMiddleware")
const upload = require("../../helpers/multer")
const chekingRoles = require("../../middlewares/cetegoryMiddleware")
const authRoute = express.Router()

authRoute.post("/register", register) // register route
authRoute.post("/emailVerify", emailVarify) // email verify route
authRoute.post("/login", login) // login route

authRoute.post("/resetPass/:randomString", resetPass) // reset password route
authRoute.post("/forgetPass", forgetPass) // forget password route

// updating profile route
authRoute.post("/update",
    authMiddleware,
    chekingRoles(["users", "admin", "stuffs"]),
    upload.single("avatar"),
    update)

module.exports = authRoute