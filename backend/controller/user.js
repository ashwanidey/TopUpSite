import Order from "../models/Orders.js";
import User from "../models/User.js";

export const myOrders = async(req,res) => {
  try{
    const {userid} = req.params
    
    const orders = await Order.find({userid:userid});
    let completed = 0;
    let refunded=0;
    for(let i = 0;i<orders.length;i++){
      if(orders[i].status === "Completed"){
        completed++;
      }
      else if(orders[i].status === "Refunded"){
        refunded++;
      }
    }
    res.status(200).json({"completed" : completed,"refunded" : refunded,"total_order" : orders.length})
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}

export const editProfile = async (req, res) => {
  try {
    const { userid } = req.body; // Assuming the user ID is passed in the request body
    const { name, email, mobilenumber } = req.body; // Data to update

    // Find the user by their userid
    const user = await User.findOne({ userid: userid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile with the provided data
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobilenumber = mobilenumber || user.mobilenumber;

    // Save the updated user profile
    const updatedUser = await user.save();

    // Return the updated user profile
    res.status(200).json({
      message: "Profile updated successfully, please relogin.",
      user: {
        userid: updatedUser.userid,
        name: updatedUser.name,
        email: updatedUser.email,
        mobilenumber: updatedUser.mobilenumber,
        picturePath: updatedUser.picturePath,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
