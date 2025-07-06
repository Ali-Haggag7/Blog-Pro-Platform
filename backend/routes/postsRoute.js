const router = require("express").Router()
const { CreatePostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require("../controllers/postsController")
const photoUpload = require("../middlewares/photoUpload")
const { VerifyToken } = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")

// /api/posts
router.route("/")
    .post(VerifyToken, photoUpload.single("image"), CreatePostCtrl)
    .get(getAllPostsCtrl)

// /api/posts/count
router.route("/count").get(getPostCountCtrl)

// /api/posts/:id
router.route("/:id")
    .get(validateObjectId, getSinglePostCtrl)
    .delete(validateObjectId, VerifyToken, deletePostCtrl)
    .put(validateObjectId, VerifyToken, updatePostCtrl)

// /api/posts/update-image/:id
router.route("/update-image/:id")
    .put(validateObjectId, VerifyToken, photoUpload.single("image"), updatePostImageCtrl)

// /api/posts/like/:id
router.route("/like/:id")
    .put(validateObjectId, VerifyToken, toggleLikeCtrl)

module.exports = router