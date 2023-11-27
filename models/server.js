const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      roles: "/api/roles",
      permisos: "/api/permisos",
      apoyo: "/api/apoyo",
      usuarios: "/api/usuarios",
      candidatos: "/api/candidatos",
      services: "/api/services",
      soporte: "/api/soporte",
    };
    //Conectar a base de datos
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
    // Fileupload - Carga de archivos
    /* this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    ); */
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.roles, require("../routes/roles"));
    this.app.use(this.paths.permisos, require("../routes/permisos"));
    this.app.use(this.paths.apoyo, require("../routes/apoyo"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.candidatos, require("../routes/candidatos"));
    this.app.use(this.paths.services, require("../routes/services"));
    this.app.use(this.paths.soporte, require("../routes/soporte"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
module.exports = Server;
