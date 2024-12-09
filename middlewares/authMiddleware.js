const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization token is missing or malformed.",
      });
    }

    // Extract token and verify it
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user. Invalid token.",
        });
      }

      // Attach decoded ID to request object
      req.userId = decode.id;
      next();
    });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error. Authentication failed.",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
