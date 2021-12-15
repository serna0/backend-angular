const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({

    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    precio: {
        type: String,
        required: [true, 'El precio es obligatorio'],
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicacion obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatorio']   
    },
    imagen: {
        type: String,
    },
    usuarioID: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    fechapublicacion: {
        type: String,
        default: new Date()
    },
    estrellas: {
        type: String,
        default: '0'
    },
    estado: {
        type: Boolean,
        default: true
    }

});



ServicioSchema.methods.toJSON = function() {
    const { __v, _id, ...servicio } = this.toObject();
    servicio.uid = _id;
    return servicio;
}

module.exports =  model('servicios', ServicioSchema);