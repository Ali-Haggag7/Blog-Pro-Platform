const nodemailer = require("nodemailer")

module.exports = async (userEmail, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.APP_EMAIL_ADDRESS,
                pass: process.env.APP_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Email Sent: " + info.response)
    } catch (error) {
        console.log(error)
        throw new Error("Internal Server Error (nodemailer)")
    }
}