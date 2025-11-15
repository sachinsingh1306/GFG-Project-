import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  // this details are add from the user profile only
  
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },


  
});

const User = mongoose.model("User", UserSchema);

export default User;
