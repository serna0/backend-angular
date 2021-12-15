const { Schema, model } = require('mongoose');

const EntregaSchema = Schema({

    /* Este debe ser ID */
    comid: {
        type: Schema.Types.ObjectId,
        ref: 'Comunidades',
        required: true
    },
    fecharegistro: {
        type: String,
        default: new Date()
    },
    cordid: {
        type: Schema.Types.ObjectId,
        ref: "Cordinadoras",
        required: true
    },
    telefono: {
        type: String,
        required: [true, 'El numero telefonico es obligatorio']
    },
    cordinadorasuplente: {
        type: String,
    },
    telefonosuplente: {
      type: String  
    },
    beneid: {
        type: Schema.Types.ObjectId,
        ref: 'Beneficiarios',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }

});



EntregaSchema.methods.toJSON = function() {
    const { __v, _id, ...entrega } = this.toObject();
    entrega.uid = _id;
    return entrega;
}

module.exports =  model('Entregas', EntregaSchema);