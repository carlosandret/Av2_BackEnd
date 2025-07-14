const dotenv = require("dotenv");
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    user: 'postgres',
    password: 'Snoop021!',
    database: process.env.DB_NAME
});

module.exports = pool