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
    createPayment,
    createProduct,
    executePayment,
    createPlan,
    generateSubscription
} = require('../controllers/metodopago');
const router = Router();

/* Rutas */
router.post('/payment', [
    validarJWT,
    validarCampos
], createPayment);
router.post('/product', [
    validarJWT,
    validarCampos
], createProduct);
router.post('/executepayment', [
    validarJWT,
    validarCampos
], executePayment); 
router.post('/plan', [
    validarJWT,
    validarCampos
], createPlan); 
router.post('/subscriptio', [
    validarJWT,
    validarCampos
], generateSubscription); 

/* Exportar */
module.exports = router;