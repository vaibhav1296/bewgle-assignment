const utility = require("./utilityService");
const { responseTimeConfig } = require("../config/customConfig");

const extractInfoFromReq = (req, res, next) => {
  const randomNumber = utility.randomNumberBetween(
    responseTimeConfig.start,
    responseTimeConfig.limit
  );
  let headers;
  if (utility.isNullOrUndefined(req.headers)) {
    headers = null;
  } else {
    headers = JSON.stringify(req.headers);
  }
  const path = req.originalUrl;
  let query;
  if (Object.keys(req.query).length === 0) {
    query = null;
  } else {
    query = JSON.stringify(req.query);
  }
  let body;
  if (utility.isNullOrUndefined(req.body)) {
    body = null;
  } else {
    body = JSON.stringify(req.body);
  }
  const duration = randomNumber;
  res.locals.reqData = {
    duration,
    body,
    query,
    headers,
    path,
  };
  next();
};

module.exports = {
  extractInfoFromReq,
};
