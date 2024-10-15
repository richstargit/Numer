require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const mysql = require('mysql2')
const { readdirSync } = require('fs')
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//const swaggerAutogen = require("./swagger-autogen");
const { Pool } = require('pg');

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
}))

app.use(bodyParser.json())
app.use(compression())

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// exports.connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// })
// const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

// Export pool เพื่อให้สามารถใช้ใน router อื่น ๆ ได้
module.exports = { pool };

// ตัวอย่างการใช้งาน pool เพื่อดึงข้อมูล

readdirSync(path.join(__dirname, 'router'))
    .map((r) => app.use('/api', require('./router/' + r)))

app.listen(process.env.SERVER_PORT || 3000, ()=>{
    console.log(`Server is running on port ${process.env.SERVER_PORT || 3000}`)
})