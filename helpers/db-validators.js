const Role = require('../models/role');
const usuarios = require('../models/usuarios');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

/* Usuarios */
const existeUsuarioPorId = async( id ) => {

    // Verificar si el Usuario existe
    const existeUsuario = await usuarios.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    existeUsuarioPorId
}


