import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';


export const sendEmail = async ({email,emailType, userId}:any) => {
  try {
    // Gen hashedToken
    const hashedToken = await bcrypt.hash(userId.toString(),10)

    if(emailType === "VERIFY"){
      const resp = await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
    }else{
      const resp = await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
    }

    // Create nodemailer transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: "88f2de6abb1827", pass: "99936af046609a" } // Add these to the .env file
    });

    const mailoptions = {
      from:'karumatendai@gmail.com',
      to:email,
      subject: emailType === "VERIFY"  ? "Verify your account" : "Password reset",
      html: `
      <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? " verify your account" : " reset your password"}</p>
      `
    }

    // Send email using the options above
    const mailResponse = await transport.sendMail(mailoptions)
    return mailResponse;
    
  } catch (error:any) {
    throw new Error(error.message)
  }
}