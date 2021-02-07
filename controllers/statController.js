const express = require("express");
const router = express.Router();
const query = require("../services/query/query");
const utility = require("../services/utilityService");

router.get("/", async (req, res) => {
  try {
    let methods = ["GET", "POST", "DELETE", "UPDATE"];
    // check if fromDate and toDate both are there in request body
    if (
      !utility.isNullOrUndefined(req.body.fromDate) &&
      !utility.isNullOrUndefined(req.body.toDate)
    ) {
      // if yes then
      const fromDate = req.body.fromDate;
      const toDate = req.body.toDate;
      let result = [];
      // iterate over all methods
      for (let j = 0; j < methods.length; j++) {
        let avgDuration = 0;
        // get requests between from date and to date
        let reply = await query.getRequstByFromAndToDate(
          methods[j],
          fromDate,
          toDate
        );
        //check if count of request is not zero then make average
        if (reply.count !== 0) {
          let sum = 0;
          for (let i = 0; i < reply.rows.length; i++) {
            sum += reply.rows[i].duration;
          }
          avgDuration = (sum / reply.count).toFixed(2);
        }
        result.push({
          totalRequests: reply.count,
          method: methods[j],
          avgDuration: avgDuration,
        });
      }
      //push every result in result array
      res.status(200).send({
        message: "Total requests with average time",
        body: result,
      });
    } else if (!utility.isNullOrUndefined(req.body.fromDate)) {
      const fromDate = req.body.fromDate;
      let result = [];

      for (let j = 0; j < methods.length; j++) {
        let avgDuration = 0;
        let reply = await query.getRequstByFromDate(methods[j], fromDate);
        if (reply.count !== 0) {
          let sum = 0;
          for (let i = 0; i < reply.rows.length; i++) {
            sum += reply.rows[i].duration;
          }
          avgDuration = (sum / reply.count).toFixed(2);
        }
        result.push({
          totalRequests: reply.count,
          method: methods[j],
          avgDuration: avgDuration,
        });
      }

      res.status(200).send({
        message: "Total requests with average time",
        body: result,
      });
    } else if (!utility.isNullOrUndefined(req.body.toDate)) {
      const fromDate = req.body.toDate;
      let result = [];

      for (let j = 0; j < methods.length; j++) {
        let avgDuration = 0;
        let reply = await query.getRequstByToDate(methods[j], fromDate);
        if (reply.count !== 0) {
          let sum = 0;
          for (let i = 0; i < reply.rows.length; i++) {
            sum += reply.rows[i].duration;
          }
          avgDuration = (sum / reply.count).toFixed(2);
        }
        result.push({
          totalRequests: reply.count,
          method: methods[j],
          avgDuration: avgDuration,
        });
      }

      res.status(200).send({
        message: "Total requests with average time",
        body: result,
      });
    } else {
      let result = [];
      for (let i = 0; i < methods.length; i++) {
        const countGet = await query.getCountOfReqByMethod(methods[i]);
        let getReply = null,
          avgDuration = 0;
        if (countGet !== 0) {
          const getReply = await query.getSumOfDuration(methods[i]);
          avgDuration = (getReply.duration / countGet).toFixed(2);
        }
        result.push({
          totalRequests: countGet,
          method: methods[i],
          avgDuration: avgDuration,
        });
      }
      res.status(200).send({
        message: "Total requests with average time",
        body: result,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
