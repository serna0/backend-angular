const { response } = require('express');
const { model } = require('mongoose');
const path = require('path');
const fs = require('fs');
/* helpers */
const { subirArchivo } = require('../helpers');
/* Models */
const beneficiarios = require('../models/beneficiarios');
const cordinadoras = require('../models/cordinadoras');

const cargarArchivo = async(req, res = response ) => {

    try{
        /* subir archivos */
        const nombre = await subirArchivo( req.files, undefined, 'imagen' );

        res.json({
            nombre 
        });
    }
    catch(msg){
        res.status(400).json({
            msg
        });
    }

}


const actualizarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion){
        case 'cordinadoras':
            modelo = await cordinadoras.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    msg: 'La cordinadora no existe'
                }); 
            }
            break;
        case 'beneficiarios':
            modelo = await beneficiarios.findById( id );  
            if( !modelo ){
                return res.status(400).json({
                    msg: 'El beneficiario no existe'
                });
            }
            break;
        default: 
            return res.status(500).json({
                msg: 'Error al actualizar la iamgen' 
            })
    }

    /* Borrar imagenes basura */
    if( modelo.imagen ){
        /* Borrar imagen de cordinadora o beneficiario */
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.imagen );
        /* Existe esta imagen */
        if( fs.existsSync( pathImagen ) ){
            /* Borrala */
            fs.unlinkSync( pathImagen ); 
        }
    }

    /* Guardar imagen en carpeta */
    const nombre =  await subirArchivo( req.files, undefined, coleccion );
    modelo.imagen = nombre;

    await modelo.save();

    res.json( modelo );
}
 
const mostrarImagen = async(req, res) =>{
    
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion){
        case 'cordinadoras':
            modelo = await cordinadoras.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    msg: 'La cordinadora no existe'
                }); 
            }
            break;
        case 'beneficiarios':
            modelo = await beneficiarios.findById( id );  
            if( !modelo ){
                return res.status(400).json({
                    msg: 'El beneficiario no existe'
                });
            }
            break;
        default: 
            return res.status(500).json({
                msg: 'Error al actualizar la iamgen' 
            })
    }

    if( modelo.imagen ){
        /* imagen de cordinadora o beneficiario */
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.imagen );
        /* Existe esta imagen */
        if( fs.existsSync( pathImagen ) ){
            /* Devolver la imagen */
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join( __dirname, '../uploads/no-image.jpg');
    res.sendFile( pathImagen );
} 

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}      