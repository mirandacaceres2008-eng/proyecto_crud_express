const jwtoken = require
("jsonwebtoken")
const autenticacion = (error, req, res, next) => {
    const token =req.header("compoAutenticar")?.split(" ")[1] // Obtener el token del encabezado Authorization
    if(!token){
        return res.status(401).json
        res.json({ mensaje: "Acceso negado, no provee token" })
    }
//verificar el token
jwttoken.verify(token, process.env.JWT_SECRETO, (error, usuario)=>{
    if(error){
        return res.status(403).json
        ({ mensaje: "Token invalido" })
    }
    req.usuario = usuario
    next()
})

}

module.exports = autenticacion