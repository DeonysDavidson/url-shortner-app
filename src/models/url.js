const { Schema, model } = require("mongoose");

const UrlSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  alias: String,
  date: { type: String, default: new Date() },
  hits: { type: Number, default: 0 },
  userId: Schema.Types.ObjectId
});

module.exports = model("Url", UrlSchema);
