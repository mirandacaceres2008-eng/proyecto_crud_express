const sistemaArchivos = require("fs");
const ruta = require("path");

const rutaMiArchivo = ruta.join(__dirname, "../../datos.json");

// Validaciones
const {
    validarNombre,
    validarCorreo,
    validarId
} = require("../../Validaciones/validacion");

// GET - consultar aprendices
const obtenerAprendices = (req, res) => {

    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                error: "no se puede leer el archivo"
            });
        }

        const listaAprendices = JSON.parse(datos);

        res.status(200).json({
            listado: listaAprendices
        });
    });
};


// POST - crear aprendiz
const crearAprendiz = (req, res) => {

    const datosAprendiz = req.body;

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

    datosAprendiz.imagen = req.file
        ? `/misimagenes/${req.file.filename}`
        : "Sin imagen";

    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                error: "no se puede leer el archivo"
            });
        }

        const listaAprendices = JSON.parse(datos);

        listaAprendices.push(datosAprendiz);

        sistemaArchivos.writeFile(
            rutaMiArchivo,
            JSON.stringify(listaAprendices, null, 2),
            (error) => {

                if (error) {
                    return res.status(500).json({
                        error: "no se puede escribir en le file"
                    });
                }

                res.status(200).json({
                    mensaje: "creado",
                    Datos: datosAprendiz
                });
            }
        );
    });
};


// PUT - actualizar aprendiz
const actualizarAprendiz = (req, res) => {

    res.status(200).json({
        mensaje: "actualizar aprendiz"
    });
};


// DELETE - eliminar aprendiz
const eliminarAprendiz = (req, res) => {

    res.status(200).json({
        mensaje: "eliminar aprendiz"
    });
};


module.exports = {
    obtenerAprendices,
    crearAprendiz,
    actualizarAprendiz,
    eliminarAprendiz
};