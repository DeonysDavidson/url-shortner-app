require("../config/dbConfig");
const bcrypt = require("bcrypt");
const saltRound = 10;

exports.generateHash = (plainText) => {
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(plainText, salt);
  return hash;
};

exports.compareHash = (plainText, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, passwordHash, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};
