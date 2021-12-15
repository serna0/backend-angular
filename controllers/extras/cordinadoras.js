const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Cordinadora = require('../models/cordinadoras');



const cordinadorasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, cordinadoras ] = await Promise.all([
        Cordinadora.countDocuments(query),
        Cordinadora.find(query)
            .populate( 'comid' ,'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        cordinadoras
    });
}

const cordinadorasPost = async(req, res = response) => {
    
    const { nombre, app, apm, telefono, comid, usuario, password, rol } = req.body;
    const cordinadora = new Cordinadora({ nombre, app, apm, telefono, comid, usuario, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    cordinadora.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await cordinadora.save();

    res.json({
        cordinadora
    });
}

const cordinadorasPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id,  password, usuario, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const cordinadora = await Cordinadora.findByIdAndUpdate( id, resto );

    res.json(cordinadora);
}

const cordinadorasPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - cordinadorasPatch'
    });
}

const cordinadorasDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Cordinadora.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}




module.exports = {
    cordinadorasGet,
    cordinadorasPost,
    cordinadorasPut,
    cordinadorasPatch,
    cordinadorasDelete,
}