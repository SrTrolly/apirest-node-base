const { request, response } = require("express");
const jwt= require("jsonwebtoken");


const validarJWT=(req=request, res=response,next)=>{

    const token= req.header("x-token");

    console.log(token);

    next();

}


module.exports={
    validarJWT
}