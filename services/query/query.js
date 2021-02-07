const models = require("../../models/index");
const sequelizeOperator = require("sequelize").Op;
const sequelize = require("sequelize");

const insertRequestData = async ({
  method,
  path,
  query,
  body,
  duration,
  headers,
}) => {
  try {
    return models.request.create({
      method,
      headers,
      path,
      query,
      duration,
      body,
    });
  } catch (err) {
    console.log(err);
  }
};

const getRequestByFromDate = async (method, fromDate) => {
  return models.request.findAndCountAll({
    where: {
      method,
      createdAt: {
        [sequelizeOperator.gte]: fromDate,
      },
    },
  });
};
const getRequestByToDate = async (method, toDate) => {
  return models.request.findAndCountAll({
    where: {
      method,
      createdAt: {
        [sequelizeOperator.lte]: toDate,
      },
    },
  });
};

const getCountOfReqByMethod = async (method) => {
  return models.request.count({
    where: {
      method,
    },
  });
};

const getSumOfDuration = async (method) => {
  return models.request.findOne({
    where: {
      method,
    },
    attributes: [
      [
        models.sequelize.fn("sum", models.sequelize.col("duration")),
        "duration",
      ],
    ],
  });
};

const getRequstByFromAndToDate = async (method, fromDate, toDate) => {
  return models.request.findAndCountAll({
    where: {
      method,
      [models.Sequelize.Op.and]: [
        { createdAt: { [models.Sequelize.Op.gte]: fromDate } },
        { createdAt: { [models.Sequelize.Op.lte]: toDate } },
      ],
    },
  });
};

module.exports = {
  insertRequestData,
  getSumOfDuration,
  getRequstByFromAndToDate,
  getRequestByFromDate,
  getCountOfReqByMethod,
  getRequestByToDate,
};
