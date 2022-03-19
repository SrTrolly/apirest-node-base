const{response,request}=require("express");



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

const usuarioPost=(req=request,res=response)=>{

    // const body=req.body;
    const {nombre,edad}=req.body
    res.json({
        msg:"post API-controlador",
        nombre:nombre,
        edad:edad
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

