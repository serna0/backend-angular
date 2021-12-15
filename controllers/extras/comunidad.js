const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Comunidad = require('../models/comunidad');


const comunidadesGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, comunidad ] = await Promise.all([
        Comunidad.countDocuments(query),
        Comunidad.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        comunidad
    });

}

const comunidadesPost = async(req, res = response) => {

    const { nombre, } = req.body;
    const comunidad = new Comunidad({ nombre });

    // Guardar en BD
    await comunidad.save();

    res.json({
        comunidad
    });

}

const comunidadesPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const comunidad = await Comunidad.findByIdAndUpdate( id, resto );

    res.json(comunidad);

}

const comunidadesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - comunidadesPatch'
    });
}

const comunidadesDelete = async(req, res = response) => {

    const { id } = req.params;
    const comunidad = await Comunidad.findByIdAndUpdate( id, { estado: false } );

    
    res.json(comunidad);

}




module.exports = {
    comunidadesGet,
    comunidadesPost,
    comunidadesPut,
    comunidadesPatch,
    comunidadesDelete,
}