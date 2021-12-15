const { response } = require('express');
const bcryptjs = require('bcryptjs');



const { generarJWT } = require('../helpers/generar-jwt');
const Usuarios = require('../models/usuarios');

const login = async(req, res = response ) => {

    const { correo, password } = req.body;

    try{

        // Verificar la cordinadora 
        const usuarioAuth =  await Usuarios.findOne({ correo });
        if( !usuarioAuth ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos'
            });
        }
        // estado === true
        // console.log(usuarioAuth.estado);
        if( !usuarioAuth.estado ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos'
            });
        }
        // verficar pass
        const validaPassword = bcryptjs.compareSync( password, usuarioAuth.password );
        // console.log(validaPassword);
        if( !validaPassword ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - password'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuarioAuth.id );

        res.json({
            usuarioAuth,
            token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Algo salio mal :('
        });
    }

    res.json({
        usuario,
        password
    });

}

module.exports = {
    login
}