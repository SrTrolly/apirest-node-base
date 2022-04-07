const { request, response } = require("express");
const { Categoria } = require("../models");



const obtenerCategorias= async (req=request, res=response)=>{
    const {limite=5,desde=0}=req.query;
    const query={estado:true};

    const [total,categorias]= await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total:total,
        categorias:categorias
    })

    
}


const obtenerCategoria= async (req=request,res=response)=>{
    const id=req.params.id;
    const categoria= await Categoria.findById(id).populate("usuario","nombre");

    res.json({
        categoria:categoria
    })

}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            ok: false,
            msg: "Esa categoria existe en la base de dato"
        })
    }

    //Generarmos la data a insertar en la base de datos
    const data = {
        nombre: nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardamos en la BD
    await categoria.save()

    res.status(201).json({
        categoria:categoria
    });
}

const actualizarCategoria=async (req = request, res = response)=>{
    const id= req.params.id;
    const{estado,usuario,...data }=req.body;

    data.nombre=data.nombre.toUpperCase();
    data.usuario=req.usuario._id

    const categoria= await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json({
        categoria:categoria
    });
    
}

const borrarCategoria=async(req=request, res=response)=>{
    const id= req.params.id;
    
    const categoria= await Categoria.findByIdAndUpdate(id,{estado:false}, {new: true});
    
    res.json({
        categoria:categoria
    });
}


module.exports = {
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategorias,
    obtenerCategoria
}
