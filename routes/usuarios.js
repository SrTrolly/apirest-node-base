const {Router}= require("express");
const { check } = require("express-validator");
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controllers/usuarios.controller");
const { esRoleValido } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");


const router=Router();

router.get("/",usuarioGet);

router.put("/:id",usuarioPut);
   
router.post("/",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({min:6}),
    check("correo","El correo no es valido").isEmail(),
    // check("rol","No es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos
],usuarioPost);

router.delete("/",usuarioDelete);

router.patch("/",usuarioPatch);

module.exports=router;



