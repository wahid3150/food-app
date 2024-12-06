const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
} = require("../controllers/orderController");

const router = express.Router();

//Create order || POST REQUEST
router.post("/create", authMiddleware, createOrder);

//Get a specific order by ID
router.get("/:id", authMiddleware, getOrder);

//Update order status
router.put("/update/:id", authMiddleware, updateOrder);

//Delete an order || DELETE REQUEST
router.delete("/delete/:id", authMiddleware, deleteOrder);

//Get all order by specific user || GET REQUEST
router.get("/user/userId", authMiddleware, getUserOrders);

module.exports = router;
