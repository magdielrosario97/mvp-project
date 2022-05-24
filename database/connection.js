const { Pool } = require("pg");

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   rejectUnauthorized: false,
});

module.exports = pool;
