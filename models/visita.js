const { DataTypes } = require("sequelize");
const sequelize = require("../database/config").sequelize;

const Visita = sequelize.define("visitas", {
  id_visita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_candidato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "candidatos",
      key: "id_candidato",
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id_usuario",
    },
  },
  razon: {
    type: DataTypes.STRING(150),
  },

  fotografia: {
    type: DataTypes.STRING(255),
  },

  latitud: {
    type: DataTypes.DECIMAL(9, 6),
  },

  longitud: {
    type: DataTypes.DECIMAL(9, 6),
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

module.exports = Visita;
