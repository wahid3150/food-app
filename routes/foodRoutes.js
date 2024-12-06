const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//Route Object
const router = express.Router();

//CREATE FOOD || GET POST
router.post("/create", authMiddleware, createFoodController);

//GET ALL FOOD || GET REQUEST
router.get("/getAll", getAllFoodController);

//GET SINGLE FOOD || GET REQUEST
router.get("/get/:id", getSingleFoodController);

//GET FOOD BY RESTAURANT || GET REQUEST
router.get("/getByRestaurant/:id", getFoodByRestaurantController);

//UPDATE FOOD || PUT REQUEST
router.put("/update/:id", authMiddleware, updateFoodController);

//DELETE FOOD || DELETE REQUEST
router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router;
