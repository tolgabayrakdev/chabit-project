import pg from "pg";

const pool = new pg.Pool({
    user: "root",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432,
});

export default pool;