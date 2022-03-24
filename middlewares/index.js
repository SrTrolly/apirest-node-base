const validaCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-roles");
const validaRoles = require("../middlewares/validar-jwt");

module.exports={
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}


