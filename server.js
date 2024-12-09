const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Rest object
dotenv.config();
const app = express();
//port
const PORT = process.env.PORT || 8000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
connectDB();

//Route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.use("/api/v1/order", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to WAHID FOOD Web page</h1>");
});

//Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgGreen);
});
