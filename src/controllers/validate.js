require("../config/dbConfig");
const User = require("../models/usersModel");
const { compareHash } = require("../service/hashingService");
const { createToken } = require("../service/jwtService");

exports.verification = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }
    const { password: hash } = user;
    compareHash(password, hash)
      .then((confirmation) => {
        if (!confirmation) {
          console.log("Invalid User");
          return res.status(400).json({ error: "Invalid User" });
        }
        const jwtToken = createToken({ email });
        console.log(jwtToken);
        res.cookie("jwt", jwtToken);
        res.status(200).json({ message: "logged in successfully", user });
      })
      .catch(console.error);
  } catch (e) {
    console.log(e);
  }
};
