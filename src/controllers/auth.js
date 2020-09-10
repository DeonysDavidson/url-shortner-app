require("../config/dbConfig");
const User = require("../models/usersModel");
const { generateHash } = require("../service/hashingService");
const mail = require("../service/authMailService");
const { createToken, validateToken } = require("../service/jwtService");

exports.signup = (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ error: "This email adress already has an account" });
      }

      const token = createToken({ firstName, lastName, email, password });
      const route = "signup/authenticate/";
      const url = process.env.URL_CONST;
      const status = mail(email, url, token, route);
      if (status) {
        console.log("Auth Email Sent");
        res
          .status(200)
          .json({ message: "An email has been sent for authentication" });
      }
    })
    .catch((e) => {
      res.status(500).json({ error: e });
    });
};

exports.saveUser = async (req, res) => {
  const token = req.params.token;
  if (token) {
    const tokenData = validateToken(token);
    if (!tokenData) {
      return res.status(400).json({ error: "token Invalid" });
    }
    const { firstName, lastName, email, password } = tokenData;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res
            .status(400)
            .json({ error: "This email already has an account" });
        }
        let newUser = new User({
          firstName,
          lastName,
          email,
          password: generateHash(password),
          active: true,
          token: null,
          expiry: null
        });

        newUser
          .save()
          .then((data) => {
            res.redirect(process.env.URL_FRONT);
            // res.status(200).json({ message: "Sign-in Success", data });
            console.log("Signin success");
          })
          .catch((err) => {
            console.log("Sign-in failed", err);
            res.status(500).json({ error: "Sign-in failed" });
          });
      })
      .catch((e) => {
        res.status(500).json({ error: "Server Error" });
      });
  } else {
    return res.status(400).json({ error: "Authentication failed, Try again!" });
  }
};
// let newUser = new User({
//   firstName,
//   lastName,
//   email,
//   password: generateHash(password)
// });

// newUser
//   .save()
//   .then(() => {
//     res.status(200).json({ message: "Sign-in Success" });
//   })
//   .catch((err) => {
//     console.log("Some error happened", err);
//     res.status(500).json({ error: err });
//   });
