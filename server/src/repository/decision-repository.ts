import pool from "../config/database";
import { PoolClient } from "pg";

export default class DecisionRepository {
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


    async create(userId: number, title: string, description: string | null, client: PoolClient) {
        const query = "INSERT INTO decisions (user_id, title, description) VALUES ($1, $2, $3) RETURNING *";
        const values = [userId, title, description];
        const result = await client.query(query, values);
        return result.rows[0];
    }

    async findByUserId(userId: number) {
        const result = await pool.query("SELECT * FROM decisions WHERE user_id = $1", [userId]);
        return result.rows;
    }

    async findById(id: number) {
        const result = await pool.query("SELECT * FROM decisions WHERE id = $1", [id]);
        return result.rows[0];
    }

    async update(client: PoolClient, id: number, title?: string, description?: string) {
        const fields = [];
        const values = [];
        let idx = 1;
        if (title !== undefined) {
            fields.push(`title = $${idx++}`);
            values.push(title);
        }
        if (description !== undefined) {
            fields.push(`description = $${idx++}`);
            values.push(description);
        }
        if (fields.length === 0) return null;

        values.push(id);
        const query = `UPDATE decisions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
        const result = await client.query(query, values);
        return result.rows[0];
    }

    async delete(id: number) {
        await pool.query("DELETE FROM decisions WHERE id = $1 RETURNING *", [id]);
    }
}