const express = require("express");
const router = express.Router();
const { createUrl, userInfo } = require("../controllers/homePage");

router.get("/:id", userInfo);
router.post("/createUrl/:id", createUrl);

module.exports = router;
