const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const sqlText = `
  SELECT * FROM genres
  `;
  pool.query(sqlText)
  .then((dbRes) => {
    res.send(dbRes.rows);
  })
  .catch((err) => {
    console.error(err);
  })
});

module.exports = router;