const express = require('express');
require('dotenv').config();

const app = express();

const PUERTO = process.env.MIPUERTO || 3003;
// Middleware body-parse
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API REST full con Express');
});

app.get('/api/aprendices', (req, res) => {
    res.status(200).json({ message: 'lista aprendices' });
});

app.post('/api/aprendices', (req, res) => {
    const datosAprendiz = req.body
    const edad=req.body.edad

    if(edad < 18){
        return res.status(201).json({ message: "crear aprendices", Datos: datosAprendiz, edad:"Eres menor de edad" });
    } else{
        return res.status(201).json({ message: "crear aprendices", Datos: datosAprendiz, edad:"Eres mayor de edad" });
    }});

app.put('/api/aprendices/:id', (req, res) => {
    res.status(200).json({ message: 'actualizar aprendiz' });
});

app.delete('/api/aprendices/:id', (req, res) => {
    res.status(200).json({ message: 'eliminado' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});

