import User from "../models/User.js";

// export const username = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const existingUser = await User.findOne({ username: username });
//     res.status(200).json({ isUnique: !existingUser });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };

export const email = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    res.status(200).json({ isUnique: !existingUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
