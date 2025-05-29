const express = require("express");
const router = express.Router();

const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middleware/auth");
const {
  createCategory,
  showAllCategories,
} = require("../controllers/category");

router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/showAllCategory", auth, isAdmin, showAllCategories);

module.exports = router;
