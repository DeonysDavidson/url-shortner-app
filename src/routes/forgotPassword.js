const express = require("express");
const { changeRequest, changePassword } = require("../controllers/passChange");

const router = express.Router();

router.post("/", changeRequest);
router.post("/reset", changePassword);

module.exports = router;
