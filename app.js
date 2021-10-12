let data = [
  { id: 1, firstName: "Matti", lastName: "Ruohonen" },
  { id: 2, firstName: "Teppo", lastName: "Ruohonen" },
];
let dictionary = [];
const express = require("express");
const fs = require("fs");
//const bodyParser = require("body-parser");
/* const app = express().use(bodyParser.json()); //vanha tapa - ei enää voimassa. 
kts. https://devdocs.io/express/ -> req.body*/
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
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
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// GET all users
app.get("/words", (req, res) => {
  const data = fs.readFileSync("./sanakirja.txt", {
    encoding: "utf8",
    flag: "r",
  });
  //data:ssa on nyt koko tiedoston sisältö
  /*tiedoston sisältö pitää pätkiä ja tehdä taulukko*/
  const splitLines = data.split(/\r?\n/);
  /*Tässä voisi käydä silmukassa läpi splitLines:ssa jokaisen rivin*/
  splitLines.forEach((line) => {
    const words = line.split(" "); //sanat taulukkoon words
    console.log(words);
    const word = {
      fin: words[0],
      eng: words[1],
    };
    dictionary.push(word);
    console.log(dictionary);
  });

  res.json(dictionary);
});
// GET a user
app.get("/word/find", (req, res) => {
  var body = {
    fin: req.query.fin,
  };
  var sana = body.fin;
  const data = fs.readFileSync("./sanakirja.txt", {
    encoding: "utf8",
    flag: "r",
  });
  //data:ssa on nyt koko tiedoston sisältö
  /*tiedoston sisältö pitää pätkiä ja tehdä taulukko*/
  const splitLines = data.split(/\r?\n/);
  /*Tässä voisi käydä silmukassa läpi splitLines:ssa jokaisen rivin*/
  splitLines.forEach((line) => {
    const words = line.split(" "); //sanat taulukkoon words
    console.log(words);
    const word = {
      fin: words[0],
      eng: words[1],
    };
    if (word.fin == sana) {
      dictionary = [];
      dictionary.push(word.eng);
    }
    console.log(dictionary);
  });

  res.json(dictionary);
});
// ADD a user

app.post("/word", function (req, res) {
  var body = {
    fin: req.query.fin,
    eng: req.query.eng,
  };
  filePath = __dirname + "/sanakirja.txt";

  fs.appendFile(filePath, "\n" + body.fin + " " + body.eng, function (err) {
    if (err) {
      throw err;
    }
    res.status(200).json({
      message: "File successfully written",
    });
  });
});
app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
