const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");



// const port=process.env.PORT;

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.usuarioPath="/api/usuarios";
        // this.authPath="/api/auth";

        this.paths = {
            auth: "/api/auth",
            buscar: "/api/buscar",
            usuarios: "/api/usuarios",
            categorias: "/api/categorias",
            productos: "/api/productos"
        }


        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.buscar, require("../routes/buscar"));
        this.app.use(this.paths.usuarios, require("../routes/usuarios"));
        this.app.use(this.paths.categorias, require("../routes/categorias"));
        this.app.use(this.paths.productos, require("../routes/productos"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }
}


module.exports = Server;