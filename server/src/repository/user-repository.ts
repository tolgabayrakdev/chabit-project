import pool from "../config/database";
import { PoolClient } from "pg";

export default class UserRepository {

    async beginTransaction() {
        const client = await pool.connect();
        await client.query("BEGIN");
        return client;
    }

    async commitTransaction(client: PoolClient) {
        await client.query("COMMIT");
        client.release();
    }

    async rollbackTransaction(client: PoolClient) {
        await client.query("ROLLBACK");
        client.release();
    }


    async findById(id: number) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    }

    async findByEmail(email: string) {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    }
    

    async createUser(user: any) {
        const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.email, user.password]);
        return result.rows[0];
    }

    async deleteUser(id: number) {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }


}