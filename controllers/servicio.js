const { response, request } = require('express');

const Servicio = require('../models/servicio');


const servicioGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, servicio ] = await Promise.all([
        Servicio.countDocuments(query),
        Servicio.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        servicio
    });
}

const servicioPost = async(req, res = response) => {
    
    const data = req.body; 

    data2 = {
        cordid: req.usuario._id,
        ...data,
    }

    res.json({
        data2
    });

    const servicio = new Servicio( data2 );
    await servicio.save();

    res.status(201).json( servicio );
}

const servicioPatch = (req, res = response) => {
    res.json({
        msg: 'patch'
    });
}

const servicioDelete = async(req, res = response) => {

    const { id } = req.params;
    const servicio = await Servicio.findByIdAndUpdate( id, { estado: false } );

    
    res.json(servicio);
}


module.exports = {
    servicioGet,
    servicioPost,
    servicioDelete,
    servicioPatch
}