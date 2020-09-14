const mysql=require("mysql");


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "p@55w0rd",
  database:"instagram"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});