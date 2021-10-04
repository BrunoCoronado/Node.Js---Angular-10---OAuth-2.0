const database = require('../services/database')

module.exports.iniciarSesion = async function(credenciales){
    let binds = [
        credenciales.usuario,
        credenciales.password
    ]

    let result = await database.ejecutarQuery('SELECT * FROM SEGURIDAD_MSPAS.TC_USUARIO WHERE USUARIO = :USUARIO AND PASSWORD = :PASSWORD AND ESTADO_REGISTRO = 1', binds)

    return result
}