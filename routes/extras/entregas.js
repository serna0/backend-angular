const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const { esRoleValido, existeBeneficiarioPorId, existeComunidadPorId } = require('../helpers/db-validators');

const { 
    entregaGet,
    entregaPut,
    entregaPost,
    entregaDelete,
    entregaPatch 
} = require('../controllers/entregas');

const router = Router();

/* Obtener todas las entregas */
router.get('/', [
    validarCampos
], entregaGet);

/* Crear */
router.post('/', [
    validarJWT,
    // check('comid','La comunidad es obligatorio').not().isEmpty(),
    // check('cordid','La cordinadora es obligatorio').not().isEmpty(),
    check('comid').custom( existeComunidadPorId ),
    check('telefono','El numero telefonico es obligatorio').not().isEmpty(),
    // check('beneid','El beneficiario es obligatorio').not().isEmpty(),
    check('beneid').custom( existeBeneficiarioPorId ),
    validarCampos
], entregaPost);

/* Actualizar entregas */
router.put('/', [
    validarJWT,
    validarCampos
], entregaPut);

/* Borrar entegas */
router.delete('/:id', [
    validarJWT,
    validarCampos
], entregaDelete );

router.patch('/', entregaPatch );

module.exports = router;