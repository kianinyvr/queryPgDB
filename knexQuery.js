const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const person = process.argv[2];

console.log(person);



// knex.select().from('artists').asCallback(function (err, result) {

  knex.select().from('famous_people').where({first_name: `${person}`}).orWhere({last_name: `${person}`}).then((name) => {
    console.log(name);
  })
    .catch((err) => {
    console.log(err);

  });

  knex.destroy();

