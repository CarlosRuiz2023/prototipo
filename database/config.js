const { Client } = require("pg");
const { Sequelize } = require("sequelize");

const dbConnection = async () => {
  try {
    const client = new Client({
      host: process.env.PG_CONNECTION_STRING,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: 5432,
      ssl: true,
    });

    await client.connect();
    console.log("Conexión exitosa a la base de datos");
    await client.end(); // Cierra la conexión después de la prueba
    return { connected: true, message: "Conexión exitosa a la base de datos" };
  } catch (error) {
    console.error("Error de conexión:", error);
    return {
      connected: false,
      message: "Error al conectar con la base de datos",
    };
  }
};

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.PG_CONNECTION_STRING,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

module.exports = {
  dbConnection,
  sequelize,
};
