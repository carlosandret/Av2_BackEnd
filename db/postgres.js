const dotenv = require("dotenv");
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    user: process.env.BD_USER,
    password: String(process.env.BD_PASSWORD),
    database: process.env.DB_NAME
});

module.exports = pool