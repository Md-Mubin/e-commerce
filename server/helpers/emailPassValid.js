// ============== email valid part
const emailValid = (userEmail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
        return (true)
    } else {
        return (false)
    }
}

// ============== pass valid part
const passValid = (userPass) => {

    if (userPass.length < 6 || userPass.length > 10) {
        return "Password must be 6-10 charecter"
    }

    if (!/[A-Z]/.test(userPass)) {
        return "Password must have a capital letter"
    }

    if (!/[a-z]/.test(userPass)) {
        return "Password must have a small letter"
    }

    if (!/[0-9]/.test(userPass)) {
        return "Password must have a number"
    }

    return false
}

module.exports = { emailValid, passValid }