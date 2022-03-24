const { request, response } = require("express");
const jwt= require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJWT= async(req=request, res=response,next)=>{

    const token= req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        });
    }

    try {

        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        const usuarioEncontrado= await Usuario.findById(uid);

        if(!usuarioEncontrado){
            return res.status(401).json({
                msg:"Token no valido- usuario no exite en base de datos"
            })
        }

        //Verificar si el uid no esta con estado false
        if(!usuarioEncontrado.estado){
            return res.status(401).json({
                msg: "Token no valido- usuario con estado:false"
            })
        }

        req.usuario=usuarioEncontrado;


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        })
    }

    
}


module.exports={
    validarJWT
}