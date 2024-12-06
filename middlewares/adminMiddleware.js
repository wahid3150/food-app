const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided",
        error,
      });
    }

    //extract and verify the token
    const token = authHeader.split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    //attach the user id to the request object
    req.userId = decode.id;

    console.log(`Decoded user ID: ${req.userId}`); // Debugging log

    //Check if the user exists and the userType is admin
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    console.log(`User found: ${user.username}, Role: ${user.userType}`);

    if (user.userType !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }
    next();
  } catch (error) {
    console.error("ERROR in admin middleware", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
