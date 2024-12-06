const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = express.Router();

//Router Register || Post request

router.post("/register", registerController);

//Router Login || Post request
router.post("/login", loginController);

module.exports = router;
