import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` contains the logged-in user's details after authentication.

    // Find the user by their ID and return the user details, excluding the password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      gender: user.gender,
      createdAt: user.createdAt, // Member since
    });
  } catch (error) {
    console.error("Error in getCurrentUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
