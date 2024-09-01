const express = require("express");
const { getUtility, addUtility, deleteUtility } = require("../../controllers/Other/utility.controller");
const router = express.Router();

router.get("/getUtility", getUtility);
router.post("/addUtility", addUtility);
router.delete("/deleteUtility/:id", deleteUtility);

module.exports = router;
