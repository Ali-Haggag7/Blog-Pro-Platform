const router = require("express").Router()
const { CreateCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl, toggleLikeCommentCtrl, getPostCommentsCtrl, CreateReplyCtrl } = require("../controllers/commentsController")
const { VerifyToken, verityTokenAndAdmin } = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")


// /api/comments
router.route("/")
    .post(VerifyToken, CreateCommentCtrl)
    .get(verityTokenAndAdmin, getAllCommentsCtrl)

// /api/comments/:id
router.route("/:id")
    .delete(validateObjectId, VerifyToken, deleteCommentCtrl)
    .put(validateObjectId, VerifyToken, updateCommentCtrl)

// /api/comments/like/:id
router.put("/like/:commentId", VerifyToken, toggleLikeCommentCtrl)

// /api/comments/post/:id
router.get("/post/:postId", getPostCommentsCtrl)

module.exports = router