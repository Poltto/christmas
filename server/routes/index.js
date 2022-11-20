var express = require('express');
var router = express.Router();
var pl = require('pg').Pool;
var jwt = require('jsonwebtoken');

const pool = new pl({
  user: 'postgres',
  host: 'app-db',
  database: 'app',
  password: '',
  port: 5432,
})

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req);
  pool.query('SELECT * FROM public.user WHERE username = $1 AND password = $2', [username, password], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
    if(!results?.rows?.length) {
      res.status(401).send('Unauthorized');
    } else {
      var token = jwt.sign({ exp: Date.now() + 2074000000000 }, 'supersafesecretkey');
      res.status(200).json(token);
    }
  });
})

router.post('/verify', function(req, res) {
  const token = req.body.token;
  jwt.verify(token, 'supersafesecretkey', function(err, decoded) {
    if(err) {
      res.status(401).send({"data": "Unauthorized"});
    } else {
      res.status(200).send({"data": "Authorized"});
    }
  });
})

module.exports = router;
