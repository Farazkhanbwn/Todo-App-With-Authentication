const User = require("../../models/auth/auth.models");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignup(req, res) {
  const { name, email, password } = req?.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.json({
    error: null,
    data: "successfully signUp",
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req?.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.json({
      error: "incorrect email and password",
      data: null,
    });
  }

  const sessionId = uuidv4();

  return res.json({
    error: null,
    data: "Login Successfully",
  });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
