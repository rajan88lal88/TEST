const mysql=require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "p@55w0rd",
  database:"instagram"
});
connection.connect();
module.exports = connection;