module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define(
    "request",
    {
      method: DataTypes.STRING,
      headers: DataTypes.JSON,
      path: DataTypes.STRING,
      query: DataTypes.JSON,
      body: DataTypes.JSON,
      duration: DataTypes.INTEGER,
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  );
  return request;
};
