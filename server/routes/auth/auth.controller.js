const User = require("../../models/auth/auth.models");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../../services/auth.service");
const { encryptTextData, isEncryptedDataValid } = require("../../utils/utils");

async function handleUserSignup(req, res) {
  const { name, email, password } = req?.body;

  const user = await User.findOne({
    email,
  });

  if (user) {
    return res.json({
      data: null,
      error: "User Already Exist",
    });
  }

  const hashPassword = await encryptTextData(password);

  await User.create({
    name,
    email,
    password: hashPassword,
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

  const isPasswordValid =
    !!user && isEncryptedDataValid(password, user?.password);

  if (!user || !isPasswordValid) {
    return res.json({
      error: "incorrect email and password",
      data: null,
    });
  }

  const sessionId = uuidv4();
  setUser(user, sessionId);
  res.cookie("uid", sessionId, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  Object.assign(user, { uid: sessionId });
  await user.save();

  return res.json({
    error: null,
    data: "Login Successfully",
  });
}

const isUserRegisterd = async (req, res) => {
  const cookieId = req?.cookies?.uid;

  if (!cookieId) {
    return res.json({
      error: "Cookie Id is Undefined",
      data: null,
    });
  }

  const user = await User.findOne(
    {
      uid: cookieId,
    },
    { uid: 0, __v: 0, _id: 0, password: 0 }
  );

  if (user) {
    return res.json({
      error: null,
      data: user,
    });
  }
  return res.json({
    error: "No User Found",
    data: null,
  });
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
  isUserRegisterd,
};
