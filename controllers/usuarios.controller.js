const bcryptjs = require("bcryptjs");
const{response,request}=require("express");


const Usuario=require("../models/usuario");




const usuarioGet=async(req=request,res=response)=>{

    // const params=req.query;
    const {limite=5,desde=0}=req.query;
    const query={estado:true};
    // const usuarios= await Usuario.find(query).skip(desde).limit(limite)
    // const total= await Usuario.countDocuments(query);

    const [total,usuarios]= await Promise.all([
        Usuario.count(query),
        Usuario.find(query).skip(desde).limit(limite)
    ]);
    res.json({
       total:total,
       usuarios:usuarios
    });
};

const usuarioPut= async(req=request,res=response)=>{

    const id =req.params.id;
    const {_id,password,google,correo, ...resto}=req.body;

    //TODO validar contra base de datos 
    if(password){
        const salt=bcryptjs.genSaltSync(10);
        resto.password=bcryptjs.hashSync(password,salt);
    }

    const usuario= await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        usuario:usuario
    });
};

const usuarioPost=async(req=request,res=response)=>{
    const {nombre,correo,password,rol}=req.body;
    const usuario= new Usuario({nombre,correo,password,rol});

    //Encriptar la contraseña
    const salt=bcryptjs.genSaltSync(10);
    usuario.password=bcryptjs.hashSync(password,salt)
    //Guardar en base de datos
    await usuario.save();

    
    res.json({
        usuario:usuario
    });
};

const usuarioDelete=async(req=request,res=response)=>{

    const {id}=req.params;

    // Fisicamente borramos la base de datos 
    // const usuario=await Usuario.findByIdAndDelete(id); no es bueno eliminar el usuario, ya que se pierde todas sus modificaciones 
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        usuario:usuario
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

