import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

pool.connect()
    .then(() => console.log('✅ Database connected successfully'))
    .catch(err => console.error('❌ Database connection error:', err.stack));

export default pool;
