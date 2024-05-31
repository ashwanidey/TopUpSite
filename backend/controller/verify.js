import User from "../models/User.js";

export const mobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const existingUser = await User.findOne({ mobilenumber: mobileNumber });
    res.status(200).json({ isUnique: !existingUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const email = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    res.status(200).json({ isUnique: !existingUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
