const express = require("express");

const router = express.Router();

const { signup, saveUser } = require("../controllers/auth");

router.get("/authenticate/:token", saveUser);
router.post("/", signup);

module.exports = router;
