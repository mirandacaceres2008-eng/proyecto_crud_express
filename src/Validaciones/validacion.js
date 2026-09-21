// name > 3 letras 
// correo con expresiones regulares
// id: 

// sin copilot

// Validar nombre
function validarNombre(nombre) {
    return nombre && nombre.trim().length >= 3;
}


// Validar correo con expresión regular
function validarCorreo(correo) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
}


// Validar ID
function validarId(id) {
    return id !== undefined && id !== null && id !== "";
}


module.exports = {
    validarNombre,
    validarCorreo,
    validarId
};



// PARA Q CORRA ES
// http://localhost:3333/api/aprendices
///EJEMPLO DE UN DATO MAL
// {
//   "id": "1",
//   "nombre": "Jo",
//   "correo": "jo@gmail.com"
// }

// MOSTRARA EL MENSAJE 
// {
//   "error": "El nombre debe tener mínimo 3 letras"
// }