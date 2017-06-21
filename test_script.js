const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

console.log('CLIENT: ', client);

//connect to our database
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  //execute a query on our data base
  client.query("SELECT $1::int AS number", ["99"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].number); //output: 99
    client.end();
  });
});

