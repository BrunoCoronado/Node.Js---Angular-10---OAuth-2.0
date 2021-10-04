const oracledb = require('oracledb');
const dbConfig = require('../config/database');

oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_12' });

let connection;

async function initialize() {
    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(dbConfig);
        console.log('Conexión a la base de datos')
    } catch (err) {
        console.error(err);
    }
}

async function close() {
    if (connection) {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
    }
}

async function ejecutarQuery(query, binds = []) {
    const result = await connection.execute(query, binds);
    return result
}

module.exports.initialize = initialize;
module.exports.close = close;
module.exports.ejecutarQuery = ejecutarQuery;