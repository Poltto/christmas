const {Pool} = require("pg");
const process = require("process");
const fs = require('fs')
const insert_text = fs.readFileSync('./door_insert.txt', 'utf8');
function initDb() {

  const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

  pool.query(`

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- Name: global; Type: SCHEMA; Schema: -; Owner: postgres
--

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);

INSERT INTO public.user (id, username, password)
VALUES (1, 'marie', 'potpourri');


CREATE TABLE public.door (
                             id integer NOT NULL,
                             isOpened bool NOT NULL DEFAULT false,
                             content text NOT NULL,
                             date timestamp NOT NULL
);

INSERT INTO public.door (id, isOpened, content, date)
VALUES (1, false, 
'It is what annoyed us so, <br>
in the start when we first came here, oh! <br><br>
The sound blasted through the night, <br>
we thought it will be a nightly fight. <br><br>
But now we rarely even remember it is there, <br>
which is good for otherwise my ears out I would tear.', '2022-12-01 00:00:00'),
       (2, false, 'potpourri', '2022-12-02 00:00:00'),
       (3, false, 'potpourri', '2022-12-03 00:00:00'),
       (4, false, 'potpourri', '2022-12-04 00:00:00'),
       (5, false, 'potpourri', '2022-12-05 00:00:00'),
       (6, false, 'potpourri', '2022-12-06 00:00:00'),
       (7, false, 'potpourri', '2022-12-07 00:00:00'),
       (8, false, 'potpourri', '2022-12-08 00:00:00'),
       (9, false, 'potpourri', '2022-12-09 00:00:00'),
       (10, false, 'potpourri', '2022-12-10 00:00:00'),
       (11, false, 'potpourri', '2022-12-11 00:00:00'),
       (12, false, 'potpourri', '2022-12-12 00:00:00'),
       (13, false, 'potpourri', '2022-12-13 00:00:00'),
       (14, false, 'potpourri', '2022-12-14 00:00:00'),
       (15, false, 'potpourri', '2022-12-15 00:00:00'),
       (16, false, 'potpourri', '2022-12-16 00:00:00'),
       (17, false, 'potpourri', '2022-12-17 00:00:00'),
       (18, false, 'potpourri', '2022-12-18 00:00:00'),
       (19, false, 'potpourri', '2022-12-19 00:00:00'),
       (20, false, 'potpourri', '2022-12-20 00:00:00'),
       (21, false, 'potpourri', '2022-12-21 00:00:00'),
       (22, false, 'potpourri', '2022-12-22 00:00:00'),
       (23, false, 'potpourri', '2022-12-23 00:00:00'),
       (24, false, 'potpourri', '2022-12-24 00:00:00');

  `, [], (err, res) => {
    if(err) {
      console.error(err);
    } else {
      console.log('Succesfully inited DB');
    }
  })
}

function resetDB() {

  const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })
  console.log("Resetting doors");

  pool.query(`
  TRUNCATE TABLE public.door;
  ${insert_text}
  `, [], (err, res) => {
    console.log(err, res);
  });
}

module.exports = {
  initDb,
  resetDB
};
