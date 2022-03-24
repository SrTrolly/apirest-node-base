const { Router } = require("express");
const { check } = require("express-validator");
const { esRoleValido,
    emailExiste,
    existeUsuarioPorId
} = require("../helpers/db-validators");

const { usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
} = require("../controllers/usuarios.controller");

const { validarCampos,
    validarJWT,
    tieneRole
} = require("../middlewares")

const router = Router();

router.get("/", usuarioGet);

router.put("/:id", [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos
], usuarioPut);

router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({ min: 6 }),
    check("correo").custom(emailExiste),
    // check("rol","No es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos
], usuarioPost);

router.delete("/:id", [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete);

router.patch("/", usuarioPatch);

module.exports = router;



