const express = require("express");
const { verification } = require("../controllers/validate");

const router = express.Router();

router.post("/", verification);

module.exports = router;
