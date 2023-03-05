const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const sqlText = `
  SELECT * FROM genres;
  `;
  pool.query(sqlText)
  .then((dbRes) => {
    res.send(dbRes.rows);
  })
  .catch((err) => {
    console.error(err);
  })
});

router.get('/:id', (req, res) => {
  const sqlText = `
  SELECT g.name FROM movies_genres mg
  JOIN genres g ON g.id = mg.genre_id
  JOIN movies m on m.id = mg.movie_id
  WHERE m.id = $1
  `;
  pool.query(sqlText, [req.params.id])
  .then((dbRes) => {
    res.send(dbRes.rows);
  })
  .catch((err) => {
    console.error(err);
  })
})

module.exports = router;