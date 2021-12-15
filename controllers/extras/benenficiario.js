const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Beneficiario = require('../models/beneficiarios');


const beneficiariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, beneficiario ] = await Promise.all([
        Beneficiario.countDocuments(query),
        Beneficiario.find(query)
            .populate( 'comid' ,'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,  
        beneficiario
    });

}

const beneficiariosPost = async(req, res = response) => {

    const { nombre, app, apm, telefono, domicilio, comid, rol } = req.body;
    const beneficiario = new Beneficiario({ nombre, app, apm, telefono, domicilio, comid, rol });

    // Guardar en BD
    await beneficiario.save();

    res.json({
        beneficiario
    });

}

const beneficiariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const beneficiario = await Beneficiario.findByIdAndUpdate( id, resto );

    res.json(beneficiario);

}

const beneficiariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - beneficiariosPatch'
    });
}

const beneficiariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const beneficiario = await Beneficiario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(beneficiario);

}




module.exports = {
    beneficiariosGet,
    beneficiariosPost,
    beneficiariosPut,
    beneficiariosPatch,
    beneficiariosDelete,
}