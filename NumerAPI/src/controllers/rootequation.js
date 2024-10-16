const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

exports.rootofequations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rootofequation');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.rootsave = async (req, res) => {
    try {
        const { equation, xl, xr, error, mode, iteration, result } = req.body;
        
        return res.status(200).send({
            request: "success",
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};