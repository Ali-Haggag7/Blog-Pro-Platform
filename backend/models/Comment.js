const mongoose = require("mongoose")
const Joi = require("joi")

// Comment Schema
const CommentSchema = new mongoose.Schema({
    postId: {  // اللي المستخدم هيكتب التعليق عليه Postال ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, {
    timestamps: true
})

// Comment Model
const Comment = mongoose.model("Comment", CommentSchema)

// Validate Create Comment
function validateCreateComment(obj) {
    const schema = Joi.object({
        postId: Joi.string().required().label("Post ID"),
        text: Joi.string().trim().required().label("Text"),
        parentComment: Joi.string().optional().allow(null).label("Parent Comment ID"),
    })
    return schema.validate(obj)
}

// Validate Update Comment
function validateUpdateComment(obj) {
    const schema = Joi.object({
        text: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
}