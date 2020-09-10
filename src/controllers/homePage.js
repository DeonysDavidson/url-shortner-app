require("../config/dbConfig");
const validUrl = require("valid-url");
const shortid = require("shortid");
// const User = require("../models/usersModel");
const Url = require("../models/url");

exports.createUrl = async (req, res) => {
  const id = req.params.id;
  const { longUrl, alias } = req.body;
  const baseUrl = process.env.URL_CONST;

  if (!validUrl.isUri(baseUrl)) {
    console.log("Invalid base Url");
    return res.status(401).json({ error: "Inalid base Url" });
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        console.log("Url Found");
        res.status(200).json(url);
      } else {
        const shortUrl = baseUrl + urlCode;

        url = new Url({
          longUrl,
          urlCode,
          shortUrl,
          alias,
          date: new Date(),
          userId: id
        });

        await url.save();
        console.log("url saved");
        res.status(200).json(url);
      }
    } catch {
      console.log("Server Error");
      res.status(500).json({ error: "Server Error!" });
    }
  } else {
    console.log("Invalid long Url");
    res.status(401).json({ error: "Invalid long Url" });
  }
};

exports.userInfo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.cookies);
    const data = await Url.find({ userId: id }).exec();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      console.log("No records found");
      res.status(400).json({ error: "No records found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
