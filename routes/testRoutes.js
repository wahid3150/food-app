const express = require("express");
const { testController } = require("../controllers/testController");

//Router object
const router = express.Router();

//Routes Get || Post || Update || Delete
router.get("/register", testController);

//Exports
module.exports = router;
