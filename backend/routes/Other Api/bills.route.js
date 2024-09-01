const express = require("express");
const { getBills, addBills, deleteBills } = require("../../controllers/Other/bills.controller");
const router = express.Router();

router.post("/getBills", getBills);
router.post("/addBills", addBills);
router.delete("/deleteBills/:id", deleteBills);

module.exports = router;
