const express = require('express');
require('dotenv').config();

const app = express();

const PUERTO = process.env.MIPUERTO || 3003;

app.get('/', (req, res) => {
    res.send('API RESTful con Express - Servidor Tradicional');
});

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});