var express = require('express');
const jwt = require("jsonwebtoken");
const {Pool: pl, Pool} = require("pg");
const process = require("process");
var router = express.Router();
const db_functions = require('../init-db');
const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

router.post('/get-calendar-doors', function(req, res) {
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

router.post('/update-door', function(req, res) {
  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(' ')[1];
  let content = req.body.content;
  let doorId = req.body.doorId;
  jwt.verify(token, 'supersafesecretkey', function(err, decoded) {
    if (err) {
      res.status(401).send('Unauthorized');
    } else {
      try {
        content = `Now broken <br>
but still loved, <br>
they traveled with you. <br><br>

They kept you warm <br>
kept you from slipping <br>
and looked stylish, too <br>

They now await <br>
for better days <br>
when you get them repaired <br><br>

Gathering dust <br>
next to other wearable stuff <br>
for chocolate, be prepared <br><br>`
        db_functions.updateDoor(doorId, content);
        res.status(200).send('OK');
      } catch(e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

router.post('/reset-doors', function(req, res) {
  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  jwt.verify(token, 'supersafesecretkey', function(err, decoded) {
    console.log(err, decoded);
    if (err) {
      res.status(401).send('Unauthorized');
    } else {
      try {
        db_functions.resetDB();
        res.status(200).send('OK');
      } catch(e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
      }
    }
  });
})

router.post('/open-door', function(req, res) {
  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(' ')[1];
  const doorId = req.body.id;
  jwt.verify(token, 'supersafesecretkey', function(err, decoded) {
    if(err) {
      res.status(401).send('Unauthorized');
    } else {
      pool.query('UPDATE public.door SET isOpened = true WHERE id = $1', [doorId], (error, results) => {
        if (error) {
          throw error
        } else {
          res.status(200).json({"data": "OK"});
        }
      });
    }
  })
})

module.exports = router;
