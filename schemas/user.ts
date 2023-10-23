import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  authentication: {
    password: { type: String, select: false },
    access_token: { type: String, select: false },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
