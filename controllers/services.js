const axios = require("axios");
const { response } = require("express");
const estados = require("../database/estadosmexico.json");
const estadosMunicipios = require("../database/estados-municipios.json");
const { dbConnection } = require("../database/config");

const estadosGet = async (req, res) => {
  try {
    // Mapear array de estados para remover el ID
    const estadosSimplificados = estados.map((estado) => {
      const { id, nombre } = estado;
      return nombre;
    });

    res.json({
      estados: estadosSimplificados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los estados" });
  }
};

const conexionGet = async (req, res) => {
  try {
    const result = await dbConnection();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al verificar la conexion a la base de datos" });
  }
};

const municipiosGet = async (req, res) => {
  try {
    const { estado } = req.params;
    // Obtener array de municipios para el estado
    const municipios = estadosMunicipios[estado];
    if (!municipios) {
      return res.status(400).json({
        msg: "Estado no encontrado",
      });
    }
    res.json({
      municipios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener municipios" });
  }
};

const coordenadasPost = async (req, res = response) => {
  try {
    const { tipo_busqueda } = req.params;
    if (tipo_busqueda === "0") {
      const { direccion } = req.body;
      const direccionFormat = direccion.replace(/\s/g, "%20");
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccionFormat}.json?country=mx&proximity=ip&access_token=${process.env.MAPBOX_KEY}`;
      const response = await axios.get(url);
      const coordenadas = response.data.features[0].geometry.coordinates;
      const [longitud, latitud] = coordenadas;
      res.json({ latitud, longitud });
    } else {
      const { latitud, longitud } = req.body;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json?access_token=${process.env.MAPBOX_KEY}`;
      const response = await axios.get(url);
      const direccion = response.data.features[0].place_name;
      res.json({ direccion });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las coordenadas" });
  }
};

module.exports = { estadosGet, municipiosGet, coordenadasPost, conexionGet };
