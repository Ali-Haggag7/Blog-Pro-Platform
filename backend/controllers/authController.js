const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { User, validateRegisterUser, validateLoginUser } = require("../models/User")
const VerificationToken = require("../models/VerificationToken")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")


// ---------------------- Register New User ------------------------
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    console.log("Incoming body:", req.body)
    console.log("username type:", typeof req.body.username)
    
    const { error } = validateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
    await user.save()

    // Create verification token
    const newVerificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    })
    await newVerificationToken.save()

    // Making the link
    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${newVerificationToken.token}`

    // Putting the link into an html template
    const htmlTemplate = `
    <div>
        <p>Click on the link below to verify your email</p>
        <a href="${link}">Verify</a>
    </div>`

    // Sending email to the user
    await sendEmail(user.email, "Verify Your Email", htmlTemplate)

    // Response to the client
    res.status(201).json({ message: "We sent to you an email, please verify your email address" })
})


// ---------------------- Login User ------------------------
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    if (!user.isAccountVerified) {
        let verificationToken = await VerificationToken.findOne({
            userId: user._id,
        })

        if (!verificationToken) {
            verificationToken = new VerificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            })
            await verificationToken.save()
        }

        const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`

        const htmlTemplate = `
            <div>
                <p>Click on the link below to verify your email</p>
                <a href="${link}">Verify</a>
            </div>`

        await sendEmail(user.email, "Verify Your Email", htmlTemplate)

        return res.status(400).json({ message: "Please verify your email before logging in" })
    }

    const token = user.generateAuthToken()

    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
        username: user.username
    })
})


// ---------------------- Verify Email ------------------------
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (!user) {
        return res.status(400).json({ message: "Invalid link" })
    }

    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token,
    })

    if (!verificationToken) {
        return res.status(400).json({ message: "Invalid or expired token" })
    }

    user.isAccountVerified = true
    await user.save()

    await VerificationToken.findByIdAndDelete(verificationToken._id)

    res.status(200).json({ message: "Your account has been verified" })
})
