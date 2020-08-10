import mongoose, { Schema } from "mongoose";

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
