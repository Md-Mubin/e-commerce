const cetegoryMiddleware = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next()
        } else {
            return res.status(400).send({ err: "Invalid Role" })
        }
    }
}

module.exports = cetegoryMiddleware
