const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../autenticate");
const Favourite = require("../models/favourite");
const cors = require("./cors");
const favRouter = express.Router();

favRouter.use(bodyParser.json());

favRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
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
  })

  .post(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
      .then((favs) => {
        console.log(favs);
        if (!favs) {
          Favourite.create({
            user: req.user._id,
            dishes: req.body.map((obj) => obj._id),
          })
            .then((doc) => {
              res.sendStatus(200).setHeader("Content-Type", "application/json");
              res.json(doc);
            })
            .catch((err) => next(err));
        } else {
          req.body.map(({ _id }) => {
            if (favs.dishes.indexOf(_id) === -1) {
              favs.dishes.push(_id);
            }
          });
          favs.save().then((updatedDoc) => {
            res.sendStatus(200).setHeader("Content-Type", "application/json");
            res.json(updatedDoc);
          });
        }
      })
      .catch((err) => next(err));
  });

module.exports = favRouter;
