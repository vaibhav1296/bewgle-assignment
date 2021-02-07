const randomNumberBetween = (start, limit) => {
  const number = Math.floor(Math.random() * (limit + 1));
  return start + number;
};
const isNullOrUndefined = (param) => {
  if (param === null || param === undefined) {
    return true;
  }
  return false;
};

const getAvgTimeAndCountReq = (countOfReq, reqObject) => {
  let getReqResult = {};
  if (countOfReq !== 0) {
    let getReqTotalTime = 0;
    //using map because in case we need other data from response
    reqObject = reqObject.rows.map((data) => {
      getReqTotalTime += data.duration;
      return {
        id: data.id,
        method: data.method,
        headers: data.headers,
        path: data.path,
        query: data.query,
        body: data.body,
        duration: data.duration,
        createdAt: data.createdAt,
      };
    });
    const avgTime = (getReqTotalTime / countOfReq).toFixed(2);
    getReqResult.count = countOfReq;
    getReqResult.averageTime = avgTime;
  } else {
    getReqResult.count = 0;
  }
  return getReqResult;
};

module.exports = {
  randomNumberBetween,
  isNullOrUndefined,
  getAvgTimeAndCountReq,
};
