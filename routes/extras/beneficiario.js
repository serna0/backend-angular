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
const { esRoleValido, existeBeneficiarioPorId, existeComunidadPorId } = require('../helpers/db-validators');


const { 
    beneficiariosGet,
    beneficiariosPost,
    beneficiariosPut,
    beneficiariosDelete,
    beneficiariosPatch 
} = require('../controllers/benenficiario');

const router = Router();

/* Peticiones */
router.get('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
], beneficiariosGet );
router.post('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('app', 'El primer apellido es obligatorio').not().isEmpty(),
    check('apm', 'El segudo apellido no debe estar vacio').not().isEmpty(),
    check('telefono', 'El numero telefonico es obligatorio').not().isEmpty(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    // check('comid','La comunidad es obligatorio').not().isEmpty(),
    check('comid').custom( existeComunidadPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], beneficiariosPost );
router.put('/:id',[ 
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeBeneficiarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], beneficiariosPut);
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeBeneficiarioPorId ),
    validarCampos
], beneficiariosDelete)
/* FinPeticiones */

router.patch('/', beneficiariosPatch  );

module.exports = router;