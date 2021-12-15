const { Schema, model } = require('mongoose');

const BeneficiarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    app: {
        type: String,
        required: [true, 'El primer apellido es obligatorio'],
    },
    apm: {
        type: String,
    },
    telefono: {
        type: String,
        required: [true, 'El numero telefonico es obligatorio']
    },
    domicilio: {
        type: String,
        required: [true, 'El domicilio es obligatorio']
    },
    imagen: {
        type: String,
        // required: [true, 'La fotografia es obligatorio']
    },
    /* Este debe ser ID */
    comid: {
        type: Schema.Types.ObjectId,
        ref: 'Comunidades',
        required: true
    },
    ruta: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE','BENEFICIARIO_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }

});



BeneficiarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...beneficiario } = this.toObject();
    beneficiario.uid = _id;
    return beneficiario;
}

module.exports =  model('Beneficiarios', BeneficiarioSchema);