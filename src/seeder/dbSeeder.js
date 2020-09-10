require("../config/dbConfig");
const User = require("../models/usersModel");

const newUser = new User({
  firstName: "deo",
  lastName: "dave",
  email: "deo@gmail.com",
  password: "1234"
});

newUser.save().then(console.log).catch(console.error);
