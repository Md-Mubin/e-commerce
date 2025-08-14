const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    try {
        const token = req.header("authorization")

        if (!token) return res.status(400).send({ err: "Something Went Wrong" })

        jwt.verify(token, process.env.SECRET_ACC_TOKEN, function (err, decoded) {
            if (err) return res.status(400).send({ err: "Something Went Wrong" })

            if (decoded) {
                req.user = decoded.data
                next()
            }
        })
    } catch (error) {
        return res.status(500).send({ err: "Server Error" })
    }

}

module.exports = authMiddleware