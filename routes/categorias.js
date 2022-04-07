const {Router, request, response}= require('express');
const {check}=require('express-validator');
const { crearCategoria, actualizarCategoria, borrarCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');



const router=Router();

/** 
 * {{url}}/api/categorias
*/

router.get("/",[

],obtenerCategorias);

router.get("/:id",[
    check("id","No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria)

router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearCategoria);

router.put("/:id",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id","No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);


router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check("id","No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)






module.exports=router;


