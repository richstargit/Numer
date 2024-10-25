const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

exports.rootofequations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rootofequation order by id');
        
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
        const result = await pool.query('SELECT * FROM linear order by id');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.linearsave = async (req, res) => {
    try {
        const { matrixA, mode, vectorB, result, n, m, vectorX, error } = req.body;

        const query = `
            INSERT INTO linear (matrixA, mode, vectorB, result, n, m, vectorX, error)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        const values = [
            matrixA,
            mode,
            vectorB,
            result,
            n,
            m,
            vectorX,
            error || 0
        ];

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

exports.inter = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Interpolation order by id');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.intersave = async (req, res) => {
    try {
        const { tablex, tabley, mode, result, n, xsize, resultx } = req.body;

        const query = `
            INSERT INTO Interpolation (tablex, tabley, mode, result, n, xsize, resultx)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        const values = [
            tablex,
            tabley,
            mode,
            result,
            n,
            xsize,
            resultx
        ];

        await pool.query(query, values);

        return res.status(200).send({
            request: "success",
            data: values,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.least = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM leastsquares order by id');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.leastsave = async (req, res) => {
    try {
        const { tablex, tabley, mode, result, n,order, xsize, resultx } = req.body;

        const query = `
            INSERT INTO leastsquares (tablex, tabley, mode, result, n,ordermandk, xsize, resultx)
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
        `;

        const values = [
            tablex,
            tabley,
            mode,
            result,
            n,
            order,
            xsize,
            resultx
        ];

        await pool.query(query, values);

        return res.status(200).send({
            request: "success",
            data: values,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.integration = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM integration order by id');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.integrationsave = async (req, res) => {
    try {
        const { equation, mode, a,b,n,result } = req.body;

        const query = `
            INSERT INTO integration (equation, mode, a,b,n,result)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const values = [
            equation, mode, a,b,n,result
        ];

        await pool.query(query, values);

        return res.status(200).send({
            request: "success",
            data: values,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.difference = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM difference order by id');
        
        return res.status(200).send({
            request: "success",
            data: result.rows,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};

exports.differencesave = async (req, res) => {
    try {
        const { equation, mode, oh,x,h,result } = req.body;

        const query = `
            INSERT INTO difference (equation, mode, oh,x,h,result)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const values = [
            equation, mode, oh,x,h,result
        ];

        await pool.query(query, values);

        return res.status(200).send({
            request: "success",
            data: values,
        });

    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send(`${error}`);
    }
};
