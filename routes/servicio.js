const { Router } = require('express');
const { check } = require('express-validator');

/* Middlewares */
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

/* Helpers */
const { esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');

/* Controllers */
const { 
    servicioGet,
    servicioPost,
    servicioDelete,
    servicioPatch
} = require('../controllers/servicio');
const router = Router();

/* Rutas */
router.get('/', [
    validarJWT,
    validarCampos
], servicioGet); 
router.post('/', [
    validarJWT,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('ubicacion','La ubicacion es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    check('usuarioID', 'El usuario es obligatorio').not().isEmpty(),
    // check('comid').custom( existePorId ),
    validarCampos
], servicioPost);
router.delete('/:id',[
    validarJWT,
    validarCampos
],servicioDelete);
router.patch('/', servicioPatch );
/* Exportar */
module.exports = router;