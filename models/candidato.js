const { DataTypes } = require("sequelize");
const sequelize = require("../database/config").sequelize;

const Candidato = sequelize.define(
  "candidatos",
  {
    id_candidato: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    municipio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    calle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entre_calles: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    no_int: {
      type: DataTypes.STRING(10),
    },
    no_ext: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    institucion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    grado_escolaridad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fotografia: {
      type: DataTypes.STRING(255),
    },
    id_tipo_apoyo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipos_apoyo",
        key: "id_tipo_apoyo",
      },
    },
    id_estatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "estatus_apoyo",
        key: "id_estatus",
      },
    },
    latitud: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    pregunta1: {
      type: DataTypes.INTEGER,
    },
    pregunta2: {
      type: DataTypes.STRING(100),
    },
    pregunta3: {
      type: DataTypes.STRING(100),
    },
    pregunta4: {
      type: DataTypes.STRING(100),
    },
    pregunta5: {
      type: DataTypes.STRING(100),
    },
    pregunta6: {
      type: DataTypes.STRING(100),
    },
    pregunta7: {
      type: DataTypes.STRING(100),
    },
    pregunta8: {
      type: DataTypes.STRING(100),
    },
    pregunta9: {
      type: DataTypes.STRING(100),
    },
    pregunta10: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW - 6 * 60 * 60 * 1000,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Candidato;
