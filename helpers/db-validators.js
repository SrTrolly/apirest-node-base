const { Categoria,Usuario,Role, Producto } = require("../models");


const esRoleValido= async(rol="")=>{
    const existeRol= await Role.findOne({rol:rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste= async(correo="")=>{
    const existeEmail=await Usuario.findOne({correo:correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya esta registrado en la BD`);
        // return res.status(400).json({
        //     msg:"El correo ya esta registrado"
        // });
    }
}

const existeUsuarioPorId=async(id)=>{
    //Verificar si el correo existe
    const existeUsuario= await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoriaPorId=async(id)=>{
    //Verificar si la categoria existe 
    const existeCategoria= await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`La categoria no existe ${id}`)
    }
}


const existeProductoPorId=async(id)=>{
    const existeProducto= await Producto.findById(id);
    if(!existeProducto){
        throw new Error (`El producto no existe ${id}`);
    }
}

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}

