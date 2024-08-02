import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    default: null,
  },
});

const AuthSchema = mongoose.model("User", authSchema);

export default AuthSchema;
