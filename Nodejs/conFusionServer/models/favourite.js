const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    dishes: [
      {
        type: Schema.Types.ObjectId,
        ref: "dishes",
      },
    ],
  },
  {
    timestamps: true,
  }
);

var Favourite = mongoose.model("favourite", favouriteSchema);

module.exports = Favourite;
