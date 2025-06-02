import pg from "pg";

const client = new pg.Client({
    user: "root",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432,
});

client.connect(() => {
    console.log("Database connected");
});

export default client;