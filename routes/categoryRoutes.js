const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/CategoryController");

//Route Object
const router = express.Router();

//CREATE CATEGORY || POST REQUEST
router.post("/create", authMiddleware, createCatController);

//GET ALL CAT || GET REQUEST
router.get("/getAll", getAllCatController);

//UPDATE CAT || PUT REQUEST
router.put("/update/:id", authMiddleware, updateCatController);

//DELETE CAT || DELETE REQUEST
router.delete("/delete/:id", authMiddleware, deleteCatController);
module.exports = router;
