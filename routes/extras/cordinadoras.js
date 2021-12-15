
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido, cordinadoraExiste, existeCordinadoraPorId } = require('../helpers/db-validators');

const { cordinadorasGet,
    cordinadorasPut,
    cordinadorasPost,
    cordinadorasDelete,
    cordinadorasPatch } = require('../controllers/cordinadoras');

const router = Router();


router.get('/', [
    /* Solo administrador puede obtener */
    validarJWT,
    tieneRole('ADMIN_ROLE'),
], cordinadorasGet );

router.put('/:id',[
    /* Solo administrador puede actualziar */
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCordinadoraPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],cordinadorasPut );

router.post('/',[
    /* Solo administrador puede crear */
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('app', 'El primer apellido es obligatorio').not().isEmpty(),
    check('apm', 'El segudo apellido no debe estar vacio').not().isEmpty(),
    check('telefono', 'El numero telefonico es obligatorio').not().isEmpty(),
    check('comid','La comunidad es obligatorio').not().isEmpty(),
    check('usuario').custom( cordinadoraExiste ),
    check('password','La contraseña debe tener un minino de 8 caracteres').isLength({ min: 8 }),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], cordinadorasPost );

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCordinadoraPorId ),
    validarCampos
],cordinadorasDelete );

router.patch('/', cordinadorasPatch );





module.exports = router;