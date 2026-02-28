const express = require("express")
const connectToDb = require("./config/connectToDb")
const sanitizeBody = require("./middlewares/sanitizeBody")
const rateLimiting = require("express-rate-limit")
const helmet = require("helmet")
const hpp = require("hpp")
const { errorHandler, notFound } = require("./middlewares/error")
const cors = require("cors")
require("dotenv").config()  //  .envيسمح للابلكيشن انه يقدر يقرأ المتغيرات اللي فال

// Connection To Db
connectToDb()

// Init App
const app = express()
app.set('trust proxy', 1)

// Middlewares
app.use(express.json())

// Security Headers (helmet)
app.use(helmet())

// Prevent Http Param Pollution
app.use(hpp())

// Prevent XSS(Cross Site Scripting) Attacks
app.use(sanitizeBody)

// Rate Limiting
app.use(rateLimiting({  // يعني كل مستخدم يقدر يبعت اقصي حاجه اتنين ريكويست requestلل limit ده بيعمل 
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
}))

// Cors Policy
app.use(cors({
    origin: "https://blog-pro-platform.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// Routes
app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/posts", require("./routes/postsRoute"))
app.use("/api/comments", require("./routes/commentsRoute"))
app.use("/api/categories", require("./routes/categoriesRoute"))
app.use("/api/password", require("./routes/passwordRoute"))

// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)


// Running The Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})