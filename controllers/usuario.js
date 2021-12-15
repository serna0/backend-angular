const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuarios');

const usuarioGet = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}
const usuarioPost = async(req, res = response) => {
    
    const { nombre, apellidos, correo, password, telefono, domicilio, plandesubscripcion, rol } = req.body;
    const usuario = new Usuario({ nombre, apellidos, correo, password, telefono, domicilio, plandesubscripcion, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id,  password, email, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuarioPatch'
    });
}

const usuaarioDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}

module.exports = {
    usuarioPost,
    usuarioGet,
    usuarioPut,
    usuarioPatch,
    usuaarioDelete
}