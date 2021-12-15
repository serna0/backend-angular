const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');
/* Facebook */

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...subirArchivo,
}