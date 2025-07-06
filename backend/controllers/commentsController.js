const asyncHandler = require("express-async-handler")
const { Comment, validateCreateComment, validateUpdateComment } = require("../models/Comment")
const { User } = require("../models/User")


/**----------------------------------------------
 * @desc Create New Comment
 * @route /api/comments
 * @method POST
 * @access private (only logged in user)
--------------------------------------------------*/
module.exports.CreateCommentCtrl = asyncHandler(async (req, res) => {
    const { error } = validateCreateComment(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const profile = await User.findById(req.user.id)

    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username,
        parentComment: req.body.parentComment || null,
    })

    res.status(201).json(comment)
})


/**----------------------------------------------
 * @desc Get All Comments
 * @route /api/comments
 * @method GET
 * @access private (only admin)
--------------------------------------------------*/
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("user")

    res.status(200).json(comments)
})


/**----------------------------------------------
 * @desc Delete Comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only admin or owner of the comment)
--------------------------------------------------*/
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        return res.status(404).json({ message: "comment not found" })
    }

    if (req.user.isAdmin || req.user.id === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "comment has been deleted" })
    }
    else {
        res.status(403).json({ message: "access denied, not allowed" })
    }
})


/**----------------------------------------------
 * @desc Update Comment
 * @route /api/comments/:id
 * @method PUT
 * @access private (only owner of the comment)
--------------------------------------------------*/
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
    // 1. Validation
    const { error } = validateUpdateComment(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    // 2. Get comment from DB
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        return res.status(404).json({ message: "comment not found" })
    }

    // 3. Authorization
    if (req.user.id !== comment.user.toString()) {
        return res.status(403).json({ message: "access denied, only user himself can edit his comment" })
    }

    // 4. Update comment
    await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text
        }
    })

    // 5. Get updated comment with user populated
    const updatedComment = await Comment.findById(req.params.id).populate("user", "username _id")

    // 6. Send response to user
    res.status(200).json(updatedComment)
})


/**----------------------------------------------
 * @desc Toggle Like
 * @route /api/comments/like/:id
 * @method PUT
 * @access private (only logged in user)
--------------------------------------------------*/
module.exports.toggleLikeCommentCtrl = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) return res.status(404).json({ message: "Comment not found" })

    const userId = req.user.id
    const isLiked = comment.likes.includes(userId)

    if (isLiked) {
        // Remove like
        comment.likes = comment.likes.filter(id => id.toString() !== userId)
    } else {
        // Add like
        comment.likes.push(userId)
    }

    await comment.save()

    // Get updated comment with user populated
    const updatedComment = await Comment.findById(comment._id).populate("user", "username")

    // Get replies linked to this comment
    const replies = await Comment.find({ parentComment: comment._id }).populate("user", "username")

    // Send comment with replies
    res.status(200).json({ ...updatedComment.toObject(), replies })
})




/**----------------------------------------------
 * @desc get Post Comments 
 * @route /api/comments/post/:id
 * @method GET
 * @access public
--------------------------------------------------*/
module.exports.getPostCommentsCtrl = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId })
        .sort({ createdAt: -1 })
        .lean() // عشان نقدر نضيف replies لاحقًا
        .populate("user", "username profilePhoto")

    // فصل الكومنتات الرئيسية عن الردود
    const topLevelComments = comments.filter(c => !c.parentComment)
    const replies = comments.filter(c => c.parentComment)

    // نضيف replies لكل كومنت رئيسي
    const commentsWithReplies = topLevelComments.map(comment => {
        return {
            ...comment,
            replies: replies.filter(r => r.parentComment?.toString() === comment._id.toString())
        }
    })

    res.status(200).json(commentsWithReplies)
})
