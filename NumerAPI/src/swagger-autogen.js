const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./router/*.js'];

const config = {
    info: {
        title: 'API Documentation',
        description: 'DETAIL API DOCUMENTATION',
    },
    tags: [ ],
    host: 'localhost:3000/api',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);