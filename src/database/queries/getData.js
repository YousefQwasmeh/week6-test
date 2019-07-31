const dbConnection = require("../db_connection");
const getCities = cb => {
  dbConnection.query(
    `select * from city`,
    (err, res) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      cb(null, res.rows);
    }
  );
};

module.exports = getCities;
