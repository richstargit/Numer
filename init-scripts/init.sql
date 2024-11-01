CREATE DATABASE numer_db;
\c numer;

CREATE TABLE rootofequation (
    id SERIAL PRIMARY KEY,
    equation VARCHAR(255),
    xl DECIMAL(18, 10),
    xr DECIMAL(18, 10),
    error DECIMAL(18, 10),
    mode VARCHAR(50),
    iteration INT,
    result DECIMAL(18, 10)
);

CREATE TABLE linear (
    id SERIAL PRIMARY KEY,
    matrixA TEXT,
    mode VARCHAR(50),
    vectorB TEXT,
    result TEXT,
    n INT,
    m INT,
    vectorX TEXT,
    error DOUBLE PRECISION
);

CREATE TABLE Interpolation (
    id SERIAL PRIMARY KEY,
    tablex TEXT,
    tabley TEXT,
    mode VARCHAR(50),
    result TEXT,
    n INT,
    xsize INT,
    resultx TEXT
);

CREATE TABLE leastsquares (
    id SERIAL PRIMARY KEY,
    tablex TEXT,
    tabley TEXT,
    mode VARCHAR(50),
    result TEXT,
    n INT,
    ordermandk INT,
    xsize INT,
    resultx TEXT
);

CREATE TABLE integration (
    id SERIAL PRIMARY KEY,
    equation TEXT,
    mode VARCHAR(50),
    a INT,
    b INT,
    n INT,
    result DOUBLE PRECISION
);

CREATE TABLE difference (
    id SERIAL PRIMARY KEY,
    equation TEXT,
    mode VARCHAR(50),
    oh VARCHAR(50),
    x DOUBLE PRECISION,
    h DOUBLE PRECISION,
    result TEXT
);