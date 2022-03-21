const bcryptjs = require("bcryptjs");
const{response,request}=require("express");
const { emailExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const Usuario=require("../models/usuario");




const usuarioGet=(req=request,res=response)=>{

    const params=req.query;
    res.json({
        msg:"get PAI-controlador"
    });
};

const usuarioPut=(req=request,res=response)=>{

    const id =req.params.id;

    res.json({
        msg:"put API-controlador",
        id:id
    });
};

const usuarioPost=async(req=request,res=response)=>{
    const {nombre,correo,password,rol}=req.body;
    const usuario= new Usuario({nombre,correo,password,rol});

    //Verificar si el correo existe
    
    // const existeEmail=await Usuario.findOne({correo:correo});
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg:"El correo ya esta registrado"
    //     });
    // }

    //Encriptar la contraseña
    const salt=bcryptjs.genSaltSync(10);
    usuario.password=bcryptjs.hashSync(password,salt)
    //Guardar en base de datos
    await usuario.save();

    
    res.json({
        usuario:usuario
    });
};

const usuarioDelete=(req=request,res=response)=>{
    res.json({
        msg:"delete API-controlador"
    });
};

const usuarioPatch=(req=request,res=response)=>{
    res.json({
        msg:"patch API-controlador"
    });
};

module.exports={
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}

