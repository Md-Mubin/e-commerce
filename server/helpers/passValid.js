const passValid = (userPass)=>{

    if(userPass.length < 6 || userPass.length > 10){
        return {error : "Password must be 6-10 charecter"}
    }

    if(!/[A-Z]/.test(userPass)){
        return {error : "Password must have a capital letter"}
    }

    if(!/[a-z]/.test(userPass)){
        return {error : "Password must have a small letter"}
    }

    if(!/[0-9]/.test(userPass)){
        return {error : "Password must have a number"}
    }

    return false
}

module.exports = passValid