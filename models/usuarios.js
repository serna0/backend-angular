const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    telefono: {
        type: String,
        required: [true, 'El numero telefonico es obligatorio']
    },
    domicilio: {
        type: String,
        required: [true, 'El estado es obligatorio']
    },
    servicioID: {
        type: String,
    },
    estrellas: {
        type: String,
        default: '0'
    },
    plandesubscripcion: {
        type: Boolean,
        required: [true, 'La subscipcion es obligatorio']
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE', 'CLIENT_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }

});



UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports =  model('Usuarios', UsuarioSchema);
