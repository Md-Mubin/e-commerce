const nodeMailer = require("nodemailer")

// sending mail OTP
const mailOTP = async (name, newUserEmail, subject, htmlBody, generatedOTP) => {

    const transPorter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: "fontdevmubin@gmail.com",
            pass: "ivmq rvrz fawx wpdz"
        }
    })

    await transPorter.sendMail({
        from: "'no replay' Md Irfan Rahman Mubin",
        to: newUserEmail,
        subject: subject,
        html: htmlBody(name, generatedOTP || "")
    })
}

// sending reset password OTP
const resetPassOTP = async (name, resetPassEmail, subject, htmlBody, generatedString) => {
    const transPorter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: "fontdevmubin@gmail.com",
            pass: "ivmq rvrz fawx wpdz"
        }
    })
    
    await transPorter.sendMail({
        from: "'no replay' Md Irfan Rahman Mubin",
        to: resetPassEmail,
        subject: subject,
        html: htmlBody(name, resetPassEmail, generatedString || "")
    })
}

module.exports = { mailOTP, resetPassOTP }