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
    usuarioPost,
    usuarioGet,
    usuarioPut,
    usuaarioDelete
} = require('../controllers/usuario');
const router = Router();

/* Rutas */
router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos,
], usuarioGet);   
router.post('/',[
    validarJWT,
    // tieneRole('ADMIN_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El primer apellido es obligatorio').not().isEmpty(),
    // check('correo').custom( cordinadoraExiste ),
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña debe tener un minino de 8 caracteres').isLength({ min: 8 }),
    check('telefono', 'El numero telefonico es obligatorio').not().isEmpty(),
    check('domicilio', 'El segudo apellido no debe estar vacio').not().isEmpty(),
    check('plandesubscripcion','El plan de subscipcion es obligatorio').not().isEmpty(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE','CLIENT_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuarioPost );
router.put('/:id',[
    validarJWT,
    // tieneRole('USER_ROLE','CLIENT_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuarioPut);
router.delete('/:id',[
    // validarJWT,
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuaarioDelete );
/* Exportar */
module.exports = router;