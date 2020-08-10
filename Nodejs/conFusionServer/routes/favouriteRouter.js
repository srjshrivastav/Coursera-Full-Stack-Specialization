const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../autenticate");
const Favourite = require("../models/favourite");
const cors = require("./cors");
const favRouter = express.Router();

favRouter.use(bodyParser);

favRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.find({})
      .populate("user")
      .populate("dishes")
      .then(
        (favs) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favs);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
