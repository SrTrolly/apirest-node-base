const { request, response } = require("express");
const { body } = require("express-validator");
const{Producto}=require("../models");





const obtenerProductos=async(req=request, res=response)=>{
    const {limite=5, desde=0}=req.query;
    const query={estado:true};

    const[total,productos]= await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate("usuario","nombre")
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total:total,
        productos:productos
    })
}

const obtenerProducto=async(req=request, res=response)=>{
    const id=req.params.id;
    const producto= await Producto.findById(id)
    .populate("usuario","nombre")
    .populate("categoria","nombre");

    res.json({
        producto:producto
    });
}


const crearProducto= async(req=request, res=response)=>{
    const {estado,usuario,...body}=req.body;
    const nombre=req.body.nombre.toUpperCase();
    const productoDB= await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            ok:false,
            msg:"Este producto existe en la base de datos"
        })
    }

    const data={
        ...body,
        nombre:nombre,
        usuario:req.usuario._id
    }

    const producto= new Producto(data);

    //Guardamos la data en la BD
    await producto.save();

    res.status(201).json({
        producto:producto
    });
}

const actualizarProducto= async(req=request, res=response)=>{
    const id=req.params.id;
    const {estado,usuario,...data}=req.body;
    if(data.nombre){
        const nombre=req.body.nombre.toUpperCase();
        data.nombre=nombre;
    }
    data.usuario=req.usuario._id;

    const producto= await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json({
        producto:producto
    });
}


const eliminarProducto=async(req=request,res=response)=>{
    const id= req.params.id;

    const producto= await Producto.findByIdAndUpdate(id,{estado:false, disponible:false},{new:true});

    res.json({
        producto:producto
    });
}







module.exports={
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}