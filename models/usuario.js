const { DataTypes } = require("sequelize");
const sequelize = require("../database/config").sequelize;

const Usuario = sequelize.define("usuarios", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  correo: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
  latitud: {
    type: DataTypes.DECIMAL(9, 6),
  },
  longitud: {
    type: DataTypes.DECIMAL(9, 6),
  },
  estatus: {
    type: DataTypes.STRING(50),
    validate: {
      isIn: [["activo", "inactivo", "bloqueado"]],
    },
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
});

module.exports = Usuario;
