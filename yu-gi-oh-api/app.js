const express = require('express');
const cors = require('cors'); // ✅ Agregado para evitar problemas CORS
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const monsterRoutes = require('./routes/monsterRoutes');
const yuGiOhSoapRoute = require('./routes/yuGiOhSoapRoute');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger.json');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// ✅ Middleware para permitir CORS
app.use(cors());

// Permitir JSON en las peticiones
app.use(express.json());

// Rutas REST
app.use('/api/monsters', monsterRoutes);

// Ruta simulada tipo SOAP (.svc)
app.use('/YuGiOhService.svc', yuGiOhSoapRoute);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Middleware de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🧙 Servicio SOAP en http://localhost:${PORT}/YuGiOhService.svc`);
});
