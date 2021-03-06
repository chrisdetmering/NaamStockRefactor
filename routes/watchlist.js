const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.post('/', async (req, res) => {
  const { symbol, userid } = req.body;
  const error = [];

  const useridAndSymbolMatch = await pool.query(
    'SELECT * FROM watchlists WHERE symbol = $1 AND user_id::text = $2',
    [symbol, userid]
  );

  if (useridAndSymbolMatch.rows.length > 0) {
    error.push({ message: 'Symbol alreay exists in watchlist.' });
  }

  if (error.length > 0) {
    return res.status(401).send(error);
  } else {
    await pool.query(
      'INSERT INTO watchlists (symbol, user_id) VALUES ($1, $2)',
      [symbol, userid]
    );
    const watchlists = await pool.query(
      'SELECT * FROM watchlists WHERE user_id::text = $1',
      [userid]
    );
    //console.log(watchlists);
    res.send(JSON.stringify(watchlists.rows));
  }
});

router.get('/:userid', async (req, res) => {
  const { userid } = req.params;

  const watchlist = await pool.query(
    'SELECT * FROM watchlists WHERE user_id::text = $1',
    [userid]
  );

  if (watchlist) {
    res.send(JSON.stringify(watchlist.rows));
  }
});

router.delete('/delete/:stockid/:userid', async (req, res) => {
  const { stockid, userid } = req.params;

  const deleteItem = await pool.query(
    'DELETE FROM watchlists WHERE id::text = $1 AND user_id::text = $2 RETURNING *',
    [stockid, userid]
  );

  const updatedWatchlist = await pool.query(
    'SELECT * FROM watchlists WHERE user_id::text = $1',
    [userid]
  );

  res.send({ updatedWatchlist: updatedWatchlist.rows });
});

module.exports = router;
