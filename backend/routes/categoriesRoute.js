const router = require("express").Router()
const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController")
const { verityTokenAndAdmin } = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")

// /api/categories
router.route("/")
    .post(verityTokenAndAdmin, createCategoryCtrl)
    .get(getAllCategoriesCtrl)

// /api/categories/:id
router.route("/:id").delete(validateObjectId, verityTokenAndAdmin, deleteCategoryCtrl)

module.exports = router