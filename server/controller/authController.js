const userSchema = require("../models/userSchema")
const { emailValid, passValid } = require("../helpers/emailPassValid")
const { mailOTP, resetPassOTP } = require("../helpers/otpWorks")
const { emailVarifiedTemplet, resetPassTamplet } = require("../helpers/templetes")
const jwt = require("jsonwebtoken")
const generatedRandomString = require("../helpers/generatedRandomString")
const cloudinary = require("../helpers/cloudinary")
const fs = require("fs")

// ==================== register 
const register = async (req, res) => {

    try {
        const { name, email, pass, phone } = req.body

        if (!name) return res.status(400).send({ err: "Name Required" })
        if (!email) return res.status(400).send({ err: "Email Required" })
        if (!emailValid(email)) return res.status(400).send({ err: "Email is not Valid" })

        // checking if user with email already exists
        const existUser = await userSchema.findOne({ email })
        if (existUser) return res.status(400).send({ err: "User Already Exists" })

        if (!pass) return res.status(400).send({ err: "Password Required" })
        if (passValid(pass)) return res.status(400).send(pass)

        if (!phone) return res.status(400).send({ err: "Phone Number Required" })

        // generate random OTP
        const random_OTP = Math.floor(1000 + Math.random() * 9000)

        // save new user 
        const newUser = new userSchema({
            name,
            email,
            pass,
            phone,
            OTP: random_OTP,
            OTP_expireTime: new Date(Date.now() + 5 * 60 * 1000)
        })

        newUser.save()

        mailOTP(name, email, "Verify with OTP", emailVarifiedTemplet, random_OTP)

        res.status(200).send({ msg: "Registration Successfull!" })
    } catch (error) {
        res.status(500).send({ err: "Server Problem" })
    }
}

// ==================== login
const login = async (req, res) => {

    try {
        const { email, pass } = req.body

        if (!email) return res.status(400).send({ err: "Email Required" })
        if (!emailValid(email)) return res.status(400).send({ err: "Email is not Valid" })

        // checking if user with email already exists
        const existUser = await userSchema.findOne({ email })
        if (!existUser) return res.status(400).send({ err: "Something went wrong" })

        if (!pass) return res.status(400).send({ err: "Password Required" })
        if (passValid(pass)) return res.status(400).send(pass)

        // to check password
        const passCheck = await existUser.isPassValid(pass)
        if (!passCheck) return res.status(400).send({ err: "Something Went Wrong" })

        if (!existUser.isVerified) return res.status(400).send({ err: "Something Went Wrong" })

        // create data set to make changes 
        const loggedUser = existUser.toObject()

        delete loggedUser.pass
        delete loggedUser.OTP
        delete loggedUser.OTP_expireTime

        // create access token
        const access_token = jwt.sign({
            data: {
                email: existUser.email,
                id: existUser._id,
                role : existUser.role
            }
        }, process.env.SECRET_ACC_TOKEN, { expiresIn: "24h" })

        if (!access_token) return res.status(400).send({ err: "Something Went Wrong" })

        res.status(400).cookie(access_token).send({ msg: `Welcome ${loggedUser.name}` }, loggedUser, access_token)
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ==================== emailVarify 
const emailVarify = async (req, res) => {

    try {
        const { email, OTP } = req.body

        if (!email || !OTP) return res.status(400).send({ err: "Invalid Request" })

        const verified_ID = await userSchema.findOne({ email, OTP, OTP_expireTime: { $gt: Date.now() } })

        // if using wrong otp more than 5 times
        if (!verified_ID) {
            const falied_attempt = await userSchema.findOneAndUpdate({ email }, { $inc: { OTP_failedAttempt: 1 } }, { new: true })
            if (falied_attempt.OTP_failedAttempt === 5) {

                falied_attempt.OTP = undefined
                falied_attempt.OTP_expireTime = undefined
                falied_attempt.OTP_failedAttempt = undefined
                falied_attempt.isVerified = false
                falied_attempt.save()
                return res.status(400).send({ err: "No attempt left! Try Again Letter" })
            }
            return res.status(400).send({ err: "Invalid OTP" })
        }

        // after successfuly giving otp
        verified_ID.OTP = undefined,
            verified_ID.OTP_expireTime = undefined,
            verified_ID.OTP_failedAttempt = undefined,
            verified_ID.isPassValid = true
        verified_ID.save()
        res.status(200).send({ msg: "Email Verified Successfull" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ==================== forgetPass
const forgetPass = async (req, res) => {

    try {
        const { email } = req.body
        if (!email) return res.status(400).send({ err: "Email Required" })

        // check if user exists
        const existUser = await userSchema.findOne({ email })
        if (!existUser) return res.status(400).send({ err: "User is not exists" })

        // create new string for reset pass link
        const createdString = generatedRandomString(30)

        existUser.resetPassID = createdString
        existUser.resetPassID_expireAt = new Date(Date.now() + 5 * 60 * 1000)
        existUser.save()

        // passing data to resetPassOtp function
        resetPassOTP(existUser.name, email, "Reset Password", resetPassTamplet, createdString)
        res.status(200).send({ msg: "Check Your Email!" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ==================== resetPass
const resetPass = async (req, res) => {

    try {
        const { newPass } = req.body
        if (!newPass) return res.status(400).send({ err: "New Password Required" })

        const randomString = req.params.randomString
        const email = req.query.email

        // checking if the user exists
        const existUser = await userSchema.findOne({ email, resetPassID: randomString, resetPassID_expireAt: { $gt: Date.now() } })
        if (!existUser) return res.status(400).send({ err: "Invalid Request" })

        existUser.pass = newPass
        existUser.resetPassID = undefined
        existUser.resetPassID_expireAt = undefined
        existUser.save()
        res.status(200).send({ msg: "Password Reset Successfull" })
    } catch (error) {
        res.status(500).send({ err: "Server Error" })
    }
}

// ==================== update
const update = async (req, res) => {
    try {
        const { name, pass } = req.body

        // check if the user exists
        const existUser = await userSchema.findById(req.user._id)
        if (!existUser) return res.status(400).send({ err: "Something Went Wrong" })

        if (!name) return res.status(400).send({ err: "Name Required" })
        if (!pass) return res.status(400).send({ err: "Password Required" })

        existUser.name = name
        existUser.pass = pass

        if (req?.file?.path) {
            if (existUser.avatar) await cloudinary.uploader.destroy(existUser.avatar.split("/").pop().split(".")[0])
            const result = await cloudinary.uploader.upload(req.file.path)
            existUser.avatar = result.url
            fs.unlinkSync(req.file.path)
        }

        existUser.save()
        res.status(200).send(existUser)
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

module.exports = { register, login, emailVarify, resetPass, forgetPass, update }