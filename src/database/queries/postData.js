const db_connection = require("../db_connection.js");
const addCity = (name, country,cb) => {
  db_connection.query(
    "INSERT INTO city (name, country) values ($1, $2)",
    [name, country],
    error => {
      if (error) {
        console.log(error);
        cb(error);
      } else {
        cb(null);
      }
    }
  );
};
module.exports = addCity;
