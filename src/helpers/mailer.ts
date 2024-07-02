import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        // create a hashed token 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType == "VERIFY"){
            await User.findByIdAndUpdate(userId, {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType == "RESET"){
            await User.findByIdAndUpdate(userId, {
              forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d8c30fab0e52cc",
                pass: "0b7cf29b92f176"
            }
        });

        const mailOptionsVerify = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }
        const mailOptionsReset = {
          from: "hitesh@gmail.com",
          to: email,
          subject:
            emailType === "RESET" ? "Verify your email" : "Reset your password",
          html: `<p>Click <a href="${
            process.env.DOMAIN
          }/resetpassword?token=${hashedToken}">here</a> to ${
            emailType === "VERIFY" ? "Verify your email" : "Reset your password"
          } or copy and paste the link below in your browser. <br> ${
            process.env.DOMAIN
          }/resetpassword?token=${hashedToken}</p>`,
        };

        const mailOptions = emailType === "VERIFY" ? mailOptionsVerify : mailOptionsReset;

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}