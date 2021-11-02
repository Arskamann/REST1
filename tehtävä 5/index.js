// Add headers
let data = [];
const mysql = require("mysql");
// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: "localhost",
  port: "3305",
  user: "artturi",
  password: "kt123456",
  database: "puhelinluettelo",
  multipleStatements: true, //out parametria varten aliohjelmassa
});
const express = require("express");
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});




//Â GETÂ allÂ users
app.get("/users", (req, res) => {
  
  con.query("SELECT * FROM henkilot", (err, rows) => {
    if (err) throw err;
    
    console.log("Data received from Db:");
    rows.forEach((row) => {
      data.push(`${row.nimi}, puhelin on ${row.puhelin}`);
      console.log(`${row.nimi}, puhelin on ${row.puhelin}`);
      
    });
    res.json(data);
    data=[];
  });



  

 
  
});
//Â GETÂ aÂ user
app.get("/users/:id", (req, res) => {

  const id = Number(req.params.id);
 

  console.log(id);
  con.query(
    `SELECT * FROM henkilot WHERE id = ${id}`,
    (err, rows) => {
      if (err) throw err;
      console.log(rows);
      data.push(rows);
      res.json(data);
    }
  );


  data=[];
});
//Â ADDÂ aÂ user
app.post("/users/add", (req, res) => {

  const henkilo = { nimi: "Ankka Roope", puhelin: "050-1231232" };
  con.query("INSERT INTO henkilot SET ?", henkilo, (err, res) => {
  if (err) throw err;

  console.log("Added: ", henkilo);
});
  res.json(data);
});
//Â UPDATEÂ aÂ user
app.put("/users/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  data = data.map((user) => (user.id === id ? updatedUser : user));
  con.query(
    "UPDATE henkilot SET puhelin = ? Where ID = ?",
    ["044-0000000", id],
    (err, result) => {
      if (err) throw err;
  
      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );
  res.json(data);
});
//Â DELETEÂ aÂ user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((user) => user.id !== id);
  con.query("DELETE FROM henkilot WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
  
    console.log(`Deleted ${result.affectedRows} row(s)`);
  });
  res.json(data);
});
app.listen(3000, () => {
  console.log("ServerÂ listeningÂ atÂ portÂ 3000");
});


/*
con.query("SELECT * FROM henkilot", (err, rows) => {
  if (err) throw err;

  console.log("Data received from Db:");
  rows.forEach((row) => {
    console.log(`${row.nimi}, puhelin on ${row.puhelin}`);
  });
});

const henkilo = { nimi: "Ankka Roope", puhelin: "050-1231232" };
con.query("INSERT INTO henkilot SET ?", henkilo, (err, res) => {
  if (err) throw err;

  console.log("Last insert ID:", res.insertId);
});

con.query(
  "UPDATE henkilot SET puhelin = ? Where ID = ?",
  ["044-6544655", 3],
  (err, result) => {
    if (err) throw err;

    console.log(`Changed ${result.changedRows} row(s)`);
  }
);

con.query("DELETE FROM henkilot WHERE id = ?", [5], (err, result) => {
  if (err) throw err;

  console.log(`Deleted ${result.affectedRows} row(s)`);
});

con.query("CALL sp_get_henkilot()", function (err, rows) {
  if (err) throw err;

  rows[0].forEach((row) => {
    console.log(`${row.nimi},  puhelin: ${row.puhelin}`);
  });
  console.log(rows);
});

con.query("CALL sp_get_henkilon_tiedot(1)", (err, rows) => {
  if (err) throw err;

  console.log("Data received from Db:\n");
  console.log(rows[0]);
});

con.query(
  "SET @henkilo_id = 0; CALL sp_insert_henkilo(@henkilo_id, 'Matti Miettinen', '044-5431232'); SELECT @henkilo_id",
  (err, rows) => {
    if (err) throw err;

    console.log("Data received from Db:\n");
    console.log(rows);
  }
);
*/
const userSubmittedVariable = "1"; /*ettÃ¤ kukaan ei voi syÃ¶ttÃ¤Ã¤ tÃ¤tÃ¤:
 const userSubmittedVariable = '1; DROP TABLE henkilot';*/
/*
con.query(
  `SELECT * FROM henkilot WHERE id = ${mysql.escape(userSubmittedVariable)}`,
  (err, rows) => {
    if (err) throw err;
    console.log(rows);
  }
);

con.end((err) => {
  //The connection is terminated gracefully
  //Ensures all remaining queries are executed
  //Then sends a quit packet to the MySQL server.
});

*/