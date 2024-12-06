const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dfood%2Blogo&psig=AOvVaw2cbpvh_m3kC135IcP6Flh1&ust=1732429964575000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLD359jq8YkDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

//exports
module.exports = mongoose.model("Category", categorySchema);
