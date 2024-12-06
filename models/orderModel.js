const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Ready for pickup",
        "Out of delivery",
        "Delivered",
        "Canceled",
      ],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online"],
      required: true,
    },
    deliveryDetails: {
      address: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      deliveryTime: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

orderSchema.pre("validate", function (next) {
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  next();
});
module.exports = mongoose.model("Order", orderSchema);
