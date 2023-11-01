import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  refresh_token: {
    type: String,
    required: false,

  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});


export default mongoose.model("User", userSchema)