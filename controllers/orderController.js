const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const restaurantModel = require("../models/restaurantModel");
const userModel = require("../models/userModel");

const createOrder = async (req, res) => {
  try {
    const { user, restaurant, items, status, paymentMethod, deliveryDetails } =
      req.body;
    if (!user || !restaurant || !items || !paymentMethod || !deliveryDetails) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    //Validate user ID
    const validUser = await userModel.findById(user);
    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "Invalid user ID",
      });
    }
    //Validate Restaurant ID
    const validRestaurant = await restaurantModel.findById(restaurant);
    if (!validRestaurant) {
      return res.status(404).send({
        success: false,
        message: "Invalid restaurant ID",
      });
    }
    //Validate Food ID
    for (const item of items) {
      const validFood = await foodModel.findById(item.food);
      if (!validFood) {
        return res.status(404).send({
          success: false,
          message: `Invalid food ID ${item.food}`,
        });
      }
    }
    const newOrder = new orderModel({
      user,
      restaurant,
      items,
      status,
      paymentMethod,
      deliveryDetails,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "ERROR in Create Order controller",
    });
  }
};

//Get a specific order by ID controller
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.findById(orderId);
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "PLease provide order ID",
      });
    }
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No Order found",
      });
    }
    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in get order controller API",
    });
  }
};

//Update order status controller
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Invalid order id",
      });
    }
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No order found",
      });
    }
    const { status, paymentMethod, deliveryDetails, items } = req.body;
    //Check if at least one field is provided to update
    if (!status && !paymentMethod && !deliveryDetails && !items) {
      return res.status(400).send({
        success: false,
        message:
          "Please provide field to update (status, paymentMethod, deliveryDetails, items",
      });
    }
    //Update the order with provided field
    if (status) {
      order.status = status;
    }
    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }
    if (deliveryDetails) {
      order.deliveryDetails = deliveryDetails;
    }
    if (items) {
      order.items = items;
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "order updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in update order API",
      error: error.message || error,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in delete router api",
      error: error.message || error,
    });
  }
};

//GET all order by specific user id
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.params.userId });
    if (orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No order found for this user",
      });
    }
    res.status(200).send({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in get user orders API",
      error: error.message || error,
    });
  }
};
module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
};
