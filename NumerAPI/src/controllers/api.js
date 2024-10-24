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

        const query = `
            INSERT INTO rootofequation (equation, xl, xr, error, mode, iteration, result)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        const values = [equation, xl?xl:0, xr?xr:0, error?error:0, mode, iteration, result];

        await pool.query(query, values);

        return res.status(200).send({
            data: values,
            request: "success",
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.linear = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM linear');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};
