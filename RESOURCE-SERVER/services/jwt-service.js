const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY = 'cnbZua0eCJ'

module.exports.unused = []

module.exports.isrevoked = async function(req, res, next){
    try {

        let headers = req.headers.authorization.split(' ')
        if(headers[0] != 'Bearer'){
            res.status(200).json({
                mensaje: 'No autorizado',
                status: 403,
            })
            return
        }else{
            const decoded = jsonwebtoken.verify(headers[1], SECRET_KEY);
            if (Date.now() >= decoded.exp * 1000) {
                res.status(200).json({
                    mensaje: 'Token Expirado',
                    status: 401,
                })
                return
            }
            next()
        }
    } catch (error) {
        res.status(200).json({
            mensaje: 'No autorizado',
            status: 403,
        })
    }
}
module.exports.errorHandler = function (err, req, res, next) {
    try {
        if (err.name === 'UnauthorizedError') console.log(`${new Date()} METHOD: ${req.method} URL: ${req.url} HOST: ${req.headers['host']} USER-AGENT: ${req.headers['user-agent']} REMOTEADDRESS: ${req.connection.remoteAddress} X-FORWARDED-FOR: ${req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : 'sin redirect proxy'}`)
    } catch (error) {
        console.log(error)
    } finally{
        if (err.name === 'UnauthorizedError') {
            res.status(200).json({
                mensaje: 'Token inválido',
                status: 404,
            })
        }
    }
}