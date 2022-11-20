var express = require('express');
const jwt = require("jsonwebtoken");
const {Pool: pl} = require("pg");
var router = express.Router();

const pool = new pl({
  user: 'postgres',
  host: 'app-db',
  database: 'app',
  password: '',
  port: 5432,
})

router.get('/get-calendar-doors', function(req, res) {
  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, 'supersafesecretkey', function(err, decoded) {
    if(err) {
      res.status(401).send('Unauthorized');

    } else {
      pool.query('SELECT * FROM public.door', [], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results?.rows);
      });
    }
  })
})

router.post('/open-door', function(req, res) {
  const token = req.body.token;
  jwt.verify(token, 'supersafesecretkey', function(err, decoded) {
    if(err) {
      res.status(401).send('Unauthorized');
    } else {

    }
  })
})

module.exports = router;
