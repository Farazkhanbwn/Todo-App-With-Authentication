const User = require("../models/auth/auth.models");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies?.uid;


  console.log("user id is : ", userId);

  if (!userId) {
    return res.json({
      message: "No user id exist",
    });
  }

  const user = User.findOne({ uid: userId });

  if (!user) {
    return res.json({
      message: "no user found",
    });
  }
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};
