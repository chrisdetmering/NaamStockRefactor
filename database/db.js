const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'ChrisSQL',
  host: 'localhost',
  port: 5432,
  database: 'stock_app',
});

module.exports = pool;
