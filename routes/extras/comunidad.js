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
const { esRoleValido, existeComunidadPorId } = require('../helpers/db-validators');

const { 
    comunidadesGet,
    comunidadesPost,
    comunidadesPut,
    comunidadesDelete,
    comunidadesPatch 
} = require('../controllers/comunidad');


const router = Router();

/* Peticiones */
router.get('/', comunidadesGet );

/* Crear entregas */
router.post('/', [
    /* Administrador solo puede crear */
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], comunidadesPost);

/* Borrar entegas */
router.put('/:id', [
    /* Administrador solo puede actualizar */
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeComunidadPorId ),
    validarCampos
], comunidadesPut);

/* Dar de baja */
router.delete('/:id', [
    /* Administrador solo puede borrar */
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeComunidadPorId ),
    validarCampos
], comunidadesDelete);

router.patch('/', comunidadesPatch  );

module.exports = router;