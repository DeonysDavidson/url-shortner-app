const dotenv = require('dotenv');
dotenv.config({path : "./config.env"});
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const signupRouter = require("./routes/signUp");
const loginRouter = require("./routes/login");
const forgotpassRouter = require("./routes/forgotPassword");
const homeRouter = require("./routes/home");
const Url = require("./models/url");
const cors = require("cors");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));
app.use(cors());
app.use(cookieParser());



app.get("/:code", async (req, res) => {
  try {
    console.log(req.params.code);
    const urlCode = req.params.code;
    const url = await Url.findOne({ urlCode });
    const num = url.hits;
    if (url) {
      res.redirect(url.longUrl);
      url.hits = num + 1;
      url.save();
    } else {
      console.log("code not found");
      res.status(404).json({ error: "code not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!" });
  }
});

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/forgotPassword", forgotpassRouter);
app.use("/home", homeRouter);

app.listen(8080, () => {
  console.log("The server is running");
});
