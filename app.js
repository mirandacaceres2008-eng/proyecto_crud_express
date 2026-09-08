const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PUERTO = process.env.MIPUERTO || 3003;
//librerias fs, path
const sistemaArchivos = require("fs");
const ruta = require("path");
const rutaMiArchivo =ruta.join(__dirname, "datos.json");


//AGREGO CORREO, ID Y NOMBRE

// Validaciones
const { validarNombre, validarCorreo, validarId } = require("./Validaciones/validacion");


//import Multer (ES PARA PONER IMAGENES EN EL SERVIDOR)
const multer = require("multer");
//Almacenamiento
const Almacen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "misimagenes/");
    },
    filename: (req, file, cb) => {
        const extension = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`)},
    
});
//CONFIGURAR EL ALMACENAMIENTO PARA Q SE SUBA EN EL POST)
const Subir =multer({ storage: Almacen });
//middleware body parser

// app.get('/', (req, res) => {
    //res.send('API Rest Full con expres');});

app.get('/api/aprendices', (req, res) => {
   // res.status(200).json({ mensaje: 'Lista Aprendices' });
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error)  res.status(500).json({ error: 'no se puede leer el archivo' });
        const listaAprendices = JSON.parse(datos);
        res.status(200).json({ listado: listaAprendices});});

});

app.post('/api/aprendices', Subir.single('imagen'), (req, res) => {
    const datosAprendiz = req.body;

//AGREGO VALIDACION DEL CORREO, ID Y NOMBRE
    // Validar nombre
    if (!validarNombre(datosAprendiz.nombre)) {
        return res.status(400).json({
            error: "El nombre debe tener mínimo 3 letras"
        });
    }

    // Validar correo
    if (!validarCorreo(datosAprendiz.correo)) {
        return res.status(400).json({
            error: "El correo no tiene un formato válido"
        });
    }

    // Validar ID
    if (!validarId(datosAprendiz.id)) {
        return res.status(400).json({
            error: "El ID es obligatorio"
        });
    }

    
    datosAprendiz.imagen = req.file?`/misimagenes/${req.file.filename}` : "Sin imagen"
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error)  res.status(500).json({ error: 'no se puede leer el archivo' });
        const listaAprendices =JSON.parse(datos);
        listaAprendices.push(datosAprendiz);
        sistemaArchivos.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error)  res.status(500).json({ error: 'no se puede escribir en le file' });
            res.status(200).json({ mensaje: "creado", Datos: datosAprendiz });});
        });


});

app.put('/api/aprendices/:id', (req, res) => {
    res.status(200).json({ mensaje: 'actualizar aprendiz' });
});

app.delete('/api/aprendices/:id', (req, res) => {
    res.status(200).json({ mensaje: 'eliminar aprendiz' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});