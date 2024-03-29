const { response, json } = require("express");
const bcryptjs=require("bcryptjs")
const { request } = require("express");
const Usuario=require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login= async(req=request,res=response)=>{

    const{correo,password}=req.body;

    try{

        //Verificar si el email existe 
        const usuario= await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - correo"
            });
        }
        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - estado:false"
            })
        }

        //verificar la contraseña

        const validPassword=bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - password"
            });
        }

        //Generar el JWT
        const token= await generarJWT(usuario.id);



        res.json({
            usuario:usuario,
            token:token
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
    
    
}

const googleSingIn=async(req=request,res=response)=>{

        const {id_token}=req.body;

        try {
            
            const {nombre,img,correo}= await googleVerify(id_token);

            let usuario= await Usuario.findOne({correo});

            if(!usuario){
                //Hay que crear el usuario 
                const data={
                    nombre:nombre,
                    correo:correo,
                    password: ":P",
                    img:img,
                    google:true
                };

                usuario=new Usuario(data);
                await usuario.save();
            }

            //Si el usuario en Base de datos

            if(!usuario.estado){
                return res.status(401).json({
                    msg:"Hable con el administrador, usuario bloqueado"
                });
            }

            //Generar el JWT
            const token = await generarJWT(usuario.id);
            

            res.json({
                usuario:usuario,
                token:token
            })
        } catch (error) {
            res.status(401).json({
                ok:false,
                msg:"El toke no se puedo verificar"
            })
        }
}




module.exports={
    login,
    googleSingIn
}