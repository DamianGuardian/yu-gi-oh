const config = {
  mongodb: {
    // URI de conexión al contenedor Mongo con autenticación
    url: "mongodb://admin:admin123@localhost:27018",

    // Nombre de tu base de datos
    databaseName: "yugioh",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin" // Muy importante para la autenticación
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
