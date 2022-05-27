const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto, obtenerProducto } = require('../controllers/productos.controller');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');



const router = Router();

/** 
 * {{url}}/api/productos
*/



router.get("/", [

], obtenerProductos);

router.get("/:id",[
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

router.get("/:id", [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
], obtenerProductos)

router.post("/", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de mongo valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put("/:id", [
    validarJWT,
    check("id","No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],eliminarProducto);


module.exports = router;
