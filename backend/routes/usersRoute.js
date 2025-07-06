const router = require("express").Router()
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteUserProfileCtrl, followUnfollowUserCtrl } = require("../controllers/usersController")
const { verityTokenAndAdmin, verityTokenAndOnlyUser, VerifyToken, verityTokenAndAuthorization } = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")
const photoUpload = require("../middlewares/photoUpload")

// /api/users/profile
router.route("/profile")
    .get(verityTokenAndAdmin, getAllUsersCtrl)

// /api/users/profile/:id
router.route("/profile/:id")
    .get(validateObjectId, getUserProfileCtrl)
    .put(validateObjectId, verityTokenAndOnlyUser, updateUserProfileCtrl)
    .delete(validateObjectId, verityTokenAndAuthorization, deleteUserProfileCtrl)

// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload")
    .post(VerifyToken, photoUpload.single("image"), profilePhotoUploadCtrl)

// /api/users/count
router.route("/count")
    .get(verityTokenAndAdmin, getUsersCountCtrl)

// /api/users/follow/:id
router.put("/follow/:id", VerifyToken, followUnfollowUserCtrl)

module.exports = router