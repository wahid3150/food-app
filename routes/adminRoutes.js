const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getAdminDashboard,
  addAdmin,
  updateOrderStatus,
  removeUser,
} = require("../controllers/adminController");

const router = express.Router();

//Admin dashboard route
router.get("/dashboard", authMiddleware, adminMiddleware, getAdminDashboard);
router.post("/create-admin", authMiddleware, adminMiddleware, addAdmin);
router.put(
  "/update-order-status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);
router.delete(
  "/delete-user/:userId",
  authMiddleware,
  adminMiddleware,
  removeUser
);
module.exports = router;
