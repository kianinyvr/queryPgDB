const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const person = process.argv.slice(2);


knex('famous_people').insert({first_name: person[0], last_name: person[1], birthdate: person[2]})
.then(res =>{
  console.log(res);
  knex.destroy();
})
.catch(err=>{
  console.log(err);
  knex.destroy();
})

