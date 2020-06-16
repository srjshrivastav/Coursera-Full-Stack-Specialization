const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);

const currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const promoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  price: {
    type: currency,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
});

var Promo = mongoose.model("Promotions", promoSchema);

module.exports = Promo;
