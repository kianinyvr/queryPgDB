const pg = require("pg");
const people = require("./people");
const person = process.argv[2];

const client = new pg.Client({
  user     : people.user,
  password : people.password,
  database : people.database,
  host     : people.hostname,
  port     : people.port,
  ssl      : people.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  //execute a query on our data base
  client.query('SELECT * FROM famous_people WHERE last_name = $1 or first_name = $1', [person], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    toPrint(result.rows) //output: 99
    client.end();
  });
});

function toPrint (arr){

  console.log("Searching...");
  console.log("Found", arr.length, 'person(s) by the name', person);

  arr.forEach(function(element) {
    console.log("-", element.id, element.first_name, element.last_name, "born", element.birthdate.toISOString().slice(0, 10));
  });
}
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'