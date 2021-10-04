const CryptoJS = require('crypto-js');

module.exports.formarResponse = function(response, mensaje, estado){
    response.status(200).json({
        mensaje: mensaje,
        status: estado,
        // new_token: response.new_token
    })
    return response;
}


module.exports.desencryptarParam = function(param) {
    var reb64 = CryptoJS.enc.Hex.parse(param);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, 'MsPaSReP0r7s');
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}

module.exports.encryptarParam = function (param) {
    var b64 = CryptoJS.AES.encrypt(param, 'MsPaSReP0r7s').toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

module.exports.validarAutorizacion = function(req){
    if(!req.get('authorization')){
        return false
    }

    let aut = req.get('authorization').split(' ')
    let buff = Buffer.from(aut[1], 'base64');
    let credentials = buff.toString('ascii');
    let credenciales = credentials.split(':')
    if(credenciales[0] == 'm$Pa$' && credenciales[1] == 'MsPaSReP0r7s'){
        return true
    }
    return false
}