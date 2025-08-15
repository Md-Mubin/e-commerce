const crypto = require("crypto")

function generateSKU(productName, color, size) {
    
    const product = productName.substring(0, 3).toUpperCase()
    const colorName = color.substring(0, 3).toUpperCase()
    const sizeCode = size.toUpperCase()

    const randomCode = crypto.randomBytes(2).toString("hex").toUpperCase()

    return `${product}-${colorName}-${sizeCode}-${randomCode}`
}

module.exports = generateSKU