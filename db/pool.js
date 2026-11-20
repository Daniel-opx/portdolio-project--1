const { Pool } = require("pg");

const pool = new Pool({
  // add your configuration
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),

});
module.exports = pool