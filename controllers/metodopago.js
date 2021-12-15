const { response } = require('express');
const request = require('request');

/* Paypal configuracion */
const CLIENT = 'AZOGwv6uGrN4n3RKcAo8gzDL_yVoPKqRjRl4GaBfe8G29ycL8XLhK-_pi8EAJhu3U-WzXZlw3VJGe-7u';
const SECRET = 'ELThWlMSxRNED-PfnGhJCsqFCUkLpM-Qp6ZyvlQYhbI1f_cHDamzvDGC2laNmff2EWCMlMp8xGtCiBvD';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Cambiar a Live https://api-m.paypal.com cuando este lista
const auth = { user: CLIENT, pass: SECRET }
/* FinPaypal */

/* Rutas */

const createPayment = (req, res) => { // Generar link para pagar

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '99'
            }
        }],
        application_context: {
            brand_name: `Pagina.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:3000/execute-payment`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago o cancelar
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const createProduct = (req, res) => {
    const product = {
        name: 'Subscripcion a xxx',
        description: "xxxx xxxxxxxxx xxxxxxxx x cobra mensualmente",
        type: 'SERVICE',
        category: 'SOFTWARE',
        image_url: 'https://i.pinimg.com/originals/ca/2d/7c/ca2d7c1591af7a505b460781059698cf.png'

    }

    //https://developer.paypal.com/docs/api/catalog-products/v1/#products_create
    request.post(`${PAYPAL_API}/v1/catalogs/products`, {
        auth,
        body: product,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const executePayment = (req, res) => { /* Captura el dinero */
    const token = req.query.token; 

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const createPlan = (req, res) => {
    const { body } = req
    //product_id

    const plan = {
        name: 'PLAN mensual',
        product_id: body.product_id,
        status: "ACTIVE",
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 1
                },
                tenure_type: "REGULAR",
                sequence: 1,
                total_cycles: 12,
                pricing_scheme: {
                    fixed_price: {
                        value: "9", // PRECIO MENSUAL QUE COBRAS 3.30USD
                        currency_code: "USD"
                    }
                }
            }],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
                value: "99",
                currency_code: "USD"
            },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
        },
        taxes: {
            percentage: "16", // 10USD + 16% = 11 USD
            inclusive: false
        }
    }

    request.post(`${PAYPAL_API}/v1/billing/plans`, {
        auth,
        body: plan,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const generateSubscription = (req, res) => {
    const { body } = req

    const subscription = {
        plan_id: body.plan_id, //P-0SX12009AR8894022MGEUTZI
        start_time: "2021-12-01T00:00:00Z", // Cuando inicia a cobrar que mes
        quantity: 1,
        subscriber: {
            /* Datos del usuario que se subscribe */
            name: {
                given_name: "test1",
                surname: "test1"
            },
            email_address: "test1@example.com",
        },
        return_url: 'http://localhost/pago-aceptado',
        cancel_url: 'http://localhost/error-404'

    }
    request.post(`${PAYPAL_API}/v1/billing/subscriptions`, {
        auth,
        body: subscription,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}
/* Rutas */

module.exports = {
    createPayment,
    createProduct,
    executePayment,
    createPlan,
    generateSubscription
}