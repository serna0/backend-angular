const { response, request } = require('express');

const Entrega = require('../models/entrega');


const entregaGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, entrega ] = await Promise.all([
        Entrega.countDocuments(query),
        Entrega.find(query)
            .populate( 'cordid',['nombre','app','apm','telefono','usuario'] )
            .populate( 'comid' ,'nombre')
            .populate( 'beneid', ['nombre','app','apm','telefono','domicilio','comid'])
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        entrega
    });
}

const entregaPost = async(req, res = response) => {
    
    const data = req.body; 

    data2 = {
        cordid: req.usuario._id,
        ...data,
    }

    res.json({
        data2
    });

    const entrega = new Entrega( data2 );
    await entrega.save();

    res.status(201).json( entrega );
}

const entregaPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id,  password, usuario, ...resto } = req.body;

    /* No se ocupa*/

    res.json({
        msg: 'No esta disponible'
    });
}

const entregaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - cordinadorasPatch'
    });
}

const entregaDelete = async(req, res = response) => {

    const { id } = req.params;
    const entrega = await Entrega.findByIdAndUpdate( id, { estado: false } );

    
    res.json(entrega);
}




module.exports = {
    entregaGet,
    entregaPost,
    entregaPut,
    entregaPatch,
    entregaDelete,
}