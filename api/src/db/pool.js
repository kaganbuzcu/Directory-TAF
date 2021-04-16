import { Pool } from "pg";
const env = require("dotenv");

env.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});

export default pool;
