require("../config/dbConfig");
const User = require("../models/usersModel");
const { generateHash } = require("../service/hashingService");
const { createToken, validateToken } = require("../service/jwtService");
const mail = require("../service/authMailService");

exports.changeRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await User.findOne({ email });
    if (!result) {
      console.log("User not found");
      res.status(400).json({ error: "User not found" });
    }
    const token = createToken({ _id: result._id });
    result.token = token;
    result.expiry = Date.now() + 1800000;
    await result.save();
    const route = "newPassword/";
    const url = process.env.URL_FRONT;
    const status = mail(email, url, token, route);
    if (status) {
      console.log("Auth Email Sent");
      res
        .status(200)
        .json({ message: "The email has been sent for authentication" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (token) {
      const tokenData = validateToken(token);
      if (!tokenData) {
        res.status(400).json({ error: "token Invalid try again" });
      }
      const { id } = tokenData;
      const account = await User.findOne({ id });
      if (account.token === token && account.expiry > Date.now()) {
        account.password = generateHash(newPassword);
        account.token = null;
        account.expiry = null;
        account
          .save()
          .then((data) => {
            console.log("password reset success");
            res.status(200).json({ message: "Password reset success" });
          })
          .catch((e) => {
            console.log("Password reset error");
            res.status(400).json({ error: "Password reset error" });
          });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
