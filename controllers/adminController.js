const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAdminDashboard = async (req, res) => {
  try {
    //fetch total Users count
    const totalUsers = await userModel.countDocuments();

    //fetch total orders count
    const totalOrders = await orderModel.countDocuments();

    //fetch total revenue
    const totalRevenue = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    //send response
    res.status(200).json({
      message: "Admin dashboard data fetched successfully!",
      data: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch Admin dashboard Data",
      error: error.message || error,
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    //Check if all fields are required
    if (!username || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //Check if admin with this email already exists
    const existingAdmin = await userModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin with this email already exists",
      });
    }

    //hash the password before saving it to database
    const hashedPassword = await bcrypt.hash(password, 10); //10 is the salt round 2n*number

    //create a new admin user
    const newAdmin = await userModel.create({
      username,
      email,
      password: hashedPassword, //save hashed password
      phone,
      userType: "admin",
    });
    res.status(201).json({
      message: "new admin created successfully",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        phone: newAdmin.phone,
        userType: newAdmin.userType,
      },
    });
  } catch (error) {
    console.error("Error creating admin", error);
    res.status(500).json({
      message: "Failed to create admin",
      error: error.message || error,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ); //return updated document
    res.status(200).json({
      message: "Order status updated successfully!",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message || error,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to delete User",
      error: error.message || error,
    });
  }
};

module.exports = { getAdminDashboard, addAdmin, updateOrderStatus, removeUser };
