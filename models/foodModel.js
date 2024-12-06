const mongoose = require("mongoose");
require("./restaurantModel");
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dfood%2Blogo&psig=AOvVaw2cbpvh_m3kC135IcP6Flh1&ust=1732429964575000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLD359jq8YkDFQAAAAAdAAAAABAE",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      validate: {
        validator: async function (value) {
          const restaurantExists = await mongoose
            .model("Restaurant")
            .exists({ _id: value });
          return restaurantExists;
        },
        message: "Restaurant ID does not exist in the database.",
      },
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
