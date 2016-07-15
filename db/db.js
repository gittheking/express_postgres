const pg       = require('pg-promise')({});

const pgConfig = {  host: process.env.PG_HOST,
                    port: process.env.PG_PORT,
                    database: 'express_pg',
                    user:process.env.PG_USER,
                    password: process.env.PG_PASSWORD };

const db       = pg(pgConfig);

function getAllUsers(req,res,next) {
  db.any(`SELECT * FROM users`)
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function getUser(req,res,next) {
  db.one(`SELECT *
          FROM users
          WHERE user_id=$1`,[req.params.id])
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    })
}

function addUser(req,res,next) {
  db.none(`INSERT INTO users 
           (first_name, last_name, age)
           VALUES 
           ($1, $2, $3);`,
          [req.body.first_name, req.body.last_name, req.body.age])
    .then( data => {
      console.log('Successfully added new entry');
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    });
}

function updateUser(req,res,next) {
  let queryString = '';
  if(req.body.first_name !== '') queryString += 'first_name = $1';
  if(req.body.last_name !== ''){
    if(queryString !== '') queryString += ','
    queryString += 'last_name=$2';
  }
  if(req.body.age !== '') {
    if(queryString !== '') queryString += ','
    queryString += 'age=$3';
  }
  db.any(`UPDATE users SET
          ${queryString}
          WHERE user_id=$4;`,
          [req.body.first_name,req.body.last_name,req.body.age,req.params.id])
    .then( data => {
      console.log('Update successful!');
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function deleteUser(req,res,next) {
  db.any(`DELETE FROM users
          WHERE user_id=$1;`, [req.params.id])
    .then( data => {
      console.log('Successfully deleted user');
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    });
}

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
