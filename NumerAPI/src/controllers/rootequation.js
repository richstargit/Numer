const { Pool } = require('pg');

// Initialize a connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

exports.bisection = async (req, res) => {
    try {
        // ทำการ query ข้อมูลจากฐานข้อมูล
        const result = await pool.query('SELECT * FROM your_table'); // แทนที่ your_table ด้วยชื่อ table ที่คุณต้องการเลือกข้อมูล
        
        // ส่งข้อมูลที่ได้กลับไปยัง client
        return res.status(200).send({
            request: "success",
            data: result.rows, // ข้อมูลที่เลือกจะอยู่ใน result.rows
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};