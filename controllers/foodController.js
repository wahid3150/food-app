const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food items created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in food API",
      error: error.message || error,
    });
  }
};

//GET ALL FOOD CONTROLLER
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in Get All Food Controller",
      error: error.message || error,
    });
  }
};

//GET SINGLE FOOD CONTROLLER
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    //find food by ID
    const food = await foodModel.findById(foodId);
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    if (!food) {
      return res.status(404).status(404).send({
        success: false,
        message: "No food found",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in Get Single food controller API",
      error: error.message || error,
    });
  }
};

//GET FOOD BY RESTAURANT CONTROLLER
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    //find food by ID
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    if (!food) {
      res.status(404).status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food found by provided id",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in get food by restaurant",
      error: error.message || error,
    });
  }
};

// UPDATE FOOD CONTROLLER
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food was updated successfully",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR in update food controller",
      error: error.message || error,
    });
  }
};

//DELETE FOOD CONTROLLER

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with provided id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "ERROR in delete food controller API",
      error: error.message || error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
};
