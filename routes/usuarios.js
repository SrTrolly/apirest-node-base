const {Router}= require("express");
const { check } = require("express-validator");
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controllers/usuarios.controller");

const router=Router();

router.get("/",usuarioGet);

router.put("/:id",usuarioPut);
   
router.post("/",[
    check("correo","El correo no es valido").isEmail(),
],usuarioPost);

router.delete("/",usuarioDelete);

router.patch("/",usuarioPatch);

module.exports=router;



