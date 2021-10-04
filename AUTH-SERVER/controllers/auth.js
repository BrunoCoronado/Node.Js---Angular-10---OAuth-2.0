const auth = require('../db_apis/auth');
const CryptoJS = require('crypto-js');
const jsonwebtoken = require('jsonwebtoken');
const utils = require('../utils/utils')

const SECRET_KEY = 'cnbZua0eCJ'

module.exports.login = async function(request, response, next){
    try {
        const credenciales = {
            usuario: request.body.usuario,
            password: CryptoJS.SHA256(request.body.password).toString().toUpperCase()
        }

        const result = await auth.iniciarSesion(credenciales)
        let access_token;
        let refresh_token;
        if(result.rows.length > 0){
            access_token = jsonwebtoken.sign({usuario: request.body.usuario}, SECRET_KEY, {expiresIn: '1m'});
            refresh_token = jsonwebtoken.sign({usuario: request.body.usuario, refresh: true}, SECRET_KEY, {expiresIn: '5m'});
        }
        response.status(200).json({
            auth: result.rows.length > 0,
            access_token: access_token,
            refresh_token: refresh_token,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al autorizar usuario.', 404)
    }
}

module.exports.refresh = async function(request, response, next){
    try {
        refresh_token = request.body.refresh_token;
        const decoded = jsonwebtoken.verify(refresh_token, SECRET_KEY);
        if(!decoded.refresh){
            response = utils.formarResponse(response, 'Refresh token inválido', 404)
        }

        let access_token = jsonwebtoken.sign({usuario: decoded.usuario}, SECRET_KEY, {expiresIn: '1m'});
        response.status(200).json({
            access_token: access_token,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al refrescar token.', 403)
    }
}