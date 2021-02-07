const express = require("express");
const router = express.Router();
const utility = require("../services/utilityService");
const { responseTimeConfig } = require("../config/customConfig");
const middleware = require("../services/middlewares");
const query = require("../services/query/query");

router.get("/get-data", middleware.extractInfoFromReq, async (req, res) => {
  try {
    res.locals.reqData.method = "GET";
    const reply = await query.insertRequestData({ ...res.locals.reqData });
    if (utility.isNullOrUndefined(reply)) {
      res.status(400).send({
        message: "SOMETHING WENT WRONG WHILE INSERTION",
      });
    } else {
      setTimeout(() => {
        res.status(200).send({
          message: "Data is successfully inserted.",
          body: res.locals.reqData,
        });
      }, res.locals.reqData.duration * 1000);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message,
    });
  }
});
router.post("/post-data", middleware.extractInfoFromReq, async (req, res) => {
  try {
    res.locals.reqData.method = "POST";
    const reply = await query.insertRequestData({ ...res.locals.reqData });
    if (utility.isNullOrUndefined(reply)) {
      res.status(400).send({
        message: "SOMETHING WENT WRONG WHILE INSERTION",
      });
    } else {
      res.locals.reqData.body = JSON.parse(res.locals.reqData.body);
      res.locals.reqData.query = JSON.parse(res.locals.reqData.query);
      res.locals.reqData.headers = JSON.parse(res.locals.reqData.headers);
      setTimeout(() => {
        res.status(200).send({
          message: "Data is successfully posted",
          body: res.locals.reqData,
        });
      }, res.locals.reqData.duration * 1000);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message,
    });
  }
});
router.put("/update-data", middleware.extractInfoFromReq, async (req, res) => {
  try {
    res.locals.reqData.method = "UPDATE";
    const reply = await query.insertRequestData({ ...res.locals.reqData });
    if (utility.isNullOrUndefined(reply)) {
      res.status(400).send({
        message: "SOMETHING WENT WRONG WHILE INSERTION",
      });
    } else {
      setTimeout(() => {
        res.status(200).send({
          message: "Data is successfully updated.",
          body: res.locals.reqData,
        });
      }, res.locals.reqData.duration * 1000);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message,
    });
  }
});
router.delete(
  "/delete-data",
  middleware.extractInfoFromReq,
  async (req, res) => {
    try {
      res.locals.reqData.method = "DELETE";
      const reply = await query.insertRequestData({ ...res.locals.reqData });
      if (utility.isNullOrUndefined(reply)) {
        res.status(400).send({
          message: "SOMETHING WENT WRONG WHILE INSERTION",
        });
      } else {
        setTimeout(() => {
          res.status(200).send({
            message: "Data is successfully deleted.",
            body: res.locals.reqData,
          });
        }, res.locals.reqData.duration * 1000);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: err.message,
      });
    }
  }
);

module.exports = router;
