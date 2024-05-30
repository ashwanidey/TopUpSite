import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    mobilenumber : {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    verified: {
      type: String,
      default : "false",
    },
    role: {
      type: String,
      default : "user",
    },
    picturePath: {
      type: String,
      default: "",
    },
    
    // location: String,
    // occupation: String,
    // following: Number,
    // followers: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;