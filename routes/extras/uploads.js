const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
/* Controllers */
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
/* Helpers */
const { coleccionesPermitidas } = require('../helpers');


const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['beneficiarios','cordinadoras'] ) ),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['beneficiarios','cordinadoras'] ) ),
    validarCampos
], actualizarImagen ); 

module.exports = router;