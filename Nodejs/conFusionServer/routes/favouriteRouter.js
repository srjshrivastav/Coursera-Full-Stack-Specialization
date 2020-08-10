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
  })
  .delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id }).then(
      (doc) => {
        if (doc) {
          doc.remove().then(() => {
            res.sendStatus(200).setHeader("Content-Type", "text/plain");
            res.end("SuccessFully Deleted all the Favs");
          });
        } else {
          res.sendStatus(200).setHeader("Content-Type", "text/plain");
          res.end("you dont have any favs yet!");
        }
      },
      (err) => next(err)
    );
  });

favRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id }).then(
      (doc) => {
        if (doc) {
          if (doc.dishes.indexOf(req.params.dishId) === -1) {
            doc.dishes.push(req.params.dishId);
            doc
              .save()
              .then(() => {
                res.sendStatus(200);
                res.setHeader("Content-Type", "text/plain");
                res.end("Success full add");
              })
              .catch((err) => next(err));
          } else {
            res.sendStatus(200);
            res.setHeader("Content-Type", "text/plain");
            res.end("Already Fav");
          }
        } else {
          Favourite.create({
            user: req.user._id,
            dishes: [req.params.dishId],
          })
            .then((newDoc) => {
              res.sendStatus(200);
              res.setHeader("Content-Type", "application/json");
              res.json(newDoc);
            })
            .catch((err) => next(err));
        }
      },
      (err) => next(err)
    );
  });

module.exports = favRouter;
