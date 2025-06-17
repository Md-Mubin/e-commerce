// ========================= email verified templete
const emailVarifiedTemplet = (userName, userOTP) => {
    return `
         <div style="margin: 0; padding: 0; background: #0F172A; font-family: 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0; background: linear-gradient(135deg, #1e293b, #0f172a);">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
          <tr>
            <td style="padding: 30px; text-align: center; background: linear-gradient(to right, #6366f1, #3b82f6); color: #ffffff;">
              <h2 style="margin: 0; font-size: 26px; letter-spacing: 1px;">🔐 Email Verification</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; color: #e2e8f0; text-align: center;">
              <p style="font-size: 18px; margin: 0 0 20px;">Hey ${userName} 👋</p>
              <p style="font-size: 16px; margin: 0 0 25px;">To secure your account, please use the OTP code below to verify your email address.</p>
              <div style="background: #374862; padding: 20px 30px; border-radius: 12px; display: inline-block; box-shadow: inset 0 0 0 2px #3b82f6;">
                <span style="font-size: 34px; font-weight: 700; color: #60a5fa; letter-spacing: 6px;">${userOTP}</span>
              </div>
              <p style="font-size: 14px; margin: 30px 0 0; color: #94a3b8;">This code is valid for the next <strong>5 minutes</strong>. Do not share it with anyone.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 25px; background-color: #1e293b; text-align: center; color: #64748b; font-size: 13px;">
              If you didn't request this email, you can safely ignore it.<br><br>
              &copy; 2025 Mubin Chat - App. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
    `
}

// ========================= reset password templete
const resetPassTamplet = (name, userEmail, generatedString) => {
    return `
  <div style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; margin-top:30px; border:1px solid #dddddd;">
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #007BFF; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <p style="font-size: 16px; color: #333333;">
            Hi ${name},
          </p>
          <p style="font-size: 16px; color: #333333;">
            We received a request to reset your password. Click the button below to set up a new password.
          </p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_BASE_URL}/resetPass/${generatedString}?email=${userEmail}" style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p style="font-size: 14px; color: #777777;">
            If you didn't request a password reset, please ignore this email or contact support if you have questions.
          </p>
        </td>
      </tr>
    </table>
  </div>
`
}

module.exports = { emailVarifiedTemplet, resetPassTamplet }