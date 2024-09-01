const express = require("express");
const router = express.Router();
const { getCategory, addCategory, deleteCategory } = require("../../controllers/Other/category.controller.js");

router.get("/getCategory", getCategory);
router.post("/addCategory", addCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
