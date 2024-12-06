const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();
//routes
//CREATE RESTAURANT || POST REQUEST
router.post("/create", authMiddleware, createRestaurantController);

//GET ALL RESTAURANT || GET REQUEST
router.get("/getAll", getAllRestaurantController);

//GET RESTAURANT BY ID
router.get("/get/:id", getRestaurantByIdController);

//DELETE RESTAURANT || DELETE REQUEST
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);
module.exports = router;
