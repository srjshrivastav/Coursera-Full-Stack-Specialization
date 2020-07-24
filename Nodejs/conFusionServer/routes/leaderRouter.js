const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../autenticate");
const cors = require("./cors");
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
const Leaders = require("../models/leaders");

leaderRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Leaders.find({})
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
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Leaders.create(req.body)
        .then(
          (result) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
          },
          (err) => next(err)
        )
        .catch((err) => console.log(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /leaders");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Leaders.remove({})
        .then(
          (result) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
          },
          (err) => next(err)
        )
        .catch((err) => console.log(err));
    }
  );

leaderRouter
  .route("/:leaderId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Leaders.findById(req.params.leaderId)
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
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.end(
        "Post operation is not supported by /leaders/" + req.params.leaderId
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Leaders.findByIdAndUpdate(
        req.params.leaderId,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      )
        .then(
          (result) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
          },
          (err) => next(err)
        )
        .catch((err) => console.log(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Leaders.findByIdAndRemove(req.params.leaderId)
        .then(
          (result) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
          },
          (err) => next(err)
        )
        .catch((err) => console.log(err));
    }
  );

module.exports = leaderRouter;
