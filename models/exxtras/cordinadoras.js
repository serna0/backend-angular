const { Schema, model } = require('mongoose');

const CordinadoraSchema = Schema({

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
    /* Este debe ser ID */
    comid: {
        type: Schema.Types.ObjectId,
        ref: 'Comunidades',
        required: true
    },
    ruta: {
        type: String,
    },
    imagen: {
        type: String,
        // required: [true, 'La fotografia es obligatorio']
    },
    usuario: {
        type: String,
        required: [true,'El usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }

});



CordinadoraSchema.methods.toJSON = function() {
    const { __v, password, _id, ...cordinadora } = this.toObject();
    cordinadora.uid = _id;
    return cordinadora;
}

module.exports =  model('Cordinadoras', CordinadoraSchema);
