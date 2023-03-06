const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  const query = `
  SELECT * FROM movies
  WHERE id = $1;
  `;
  pool.query(query, [req.params.id])
  .then((dbRes) => {
    res.send(dbRes.rows[0]);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    // console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
      let valuesString = `VALUES `;
      for (let id in req.body.genre_ids) {
        if (id == req.body.genre_ids.length - 1) {
          valuesString += `($1, $${Number(id)  + 2})`
        } else {
          valuesString += `($1, $${Number(id) + 2}),`
        }
      }
      console.log(valuesString)
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" ("movie_id", "genre_id")
        ${valuesString};
        `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      console.log(...req.body.genre_ids)
      pool.query(insertMovieGenreQuery, [createdMovieId, ...req.body.genre_ids]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.put('/:id', (req, res) => {
  const query = `
  UPDATE movies
  SET "title" = $1, "description" = $2
  WHERE id = $3
  `
  console.log(req.body)
  pool.query(query, [req.body.title, req.body.description, req.params.id])
  .then((dbRes) => {
    // console.log(dbRes);
    res.sendStatus(201);
  })
  .catch((error) => {
    console.error(error);
    res.sendStatus(500);
  })
})

module.exports = router;