const { Schema, model } = require('mongoose');

const ComunidadSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    }

});



ComunidadSchema.methods.toJSON = function() {
    const { __v, _id, ...comunidad } = this.toObject();
    comunidad.uid = _id;
    return comunidad;
}

module.exports = model('Comunidades', ComunidadSchema);