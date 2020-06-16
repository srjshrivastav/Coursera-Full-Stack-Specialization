const express = require("express");
const bodyParser = require("body-parser");
const promo = require("../models/promotion");
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
promoRouter
  .route("/")
  .get((req, res, next) => {
    promo
      .find({})
      .then(
        (promos) => {
          (res.statusCode = 200),
            res.setHeader("Content-Type", "application/json");
          res.json(promos);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  })
  .post((req, res, next) => {
    promo
      .create(req.body)
      .then(
        (promo) => {
          console.log("Promo Created ", promo);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res, next) => {
    promo
      .remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    promo
      .findById(req.params.promoId)
      .then(
        (result) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(result);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      `Post operation not supported on /promotions/${req.params.promoId}`
    );
  })
  .put((req, res, next) => {
    promo
      .findByIdAndUpdate(
        req.params.promoId,
        {
          $set: req.body,
        },
        { new: true }
      )
      .then(
        (result) => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/json");
          res.json(result);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  })
  .delete((req, res, next) => {
    promo
      .findByIdAndRemove(req.params.promoId)
      .then(
        (result) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(result);
        },
        (err) => next(err)
      )
      .catch((err) => console.log(err));
  });

module.exports = promoRouter;
