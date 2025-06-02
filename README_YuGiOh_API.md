
# Yu-Gi-Oh API

API RESTful desarrollada en Node.js para la gestión de cartas del universo Yu-Gi-Oh.

## 📦 Tecnologías Utilizadas

- Lenguaje: JavaScript (Node.js)
- Framework: Express
- Base de datos: MongoDB
- Autenticación: OAuth2 (Hydra) con JWT
- Documentación: Swagger
- Contenedores: Docker y Docker Compose

---

## 🚀 Cómo levantar el entorno completo

1. Asegúrate de tener instalado:

   - Docker
   - Docker Compose

2. Ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

Esto iniciará:
- El servidor de la API en `http://localhost:8080`
- MongoDB
- Hydra (admin en `http://localhost:4445`, public en `http://localhost:4444`)

---

## 🔐 Registro de Clientes en Hydra

### Cliente para lectura (Read)

```json
POST http://localhost:4445/admin/clients
Content-Type: application/json

{
  "client_id": "yugioh-api-read-client",
  "client_secret": "yugioh-read-secret",
  "grant_types": ["client_credentials"],
  "response_types": ["token"],
  "scope": "Read",
  "audience": ["yugioh-api"],
  "token_endpoint_auth_method": "client_secret_basic",
  "access_token_strategy": "jwt"
}
```

### Cliente para escritura (Write)

```json
POST http://localhost:4445/admin/clients
Content-Type: application/json

{
  "client_id": "yugioh-api-write-client",
  "client_secret": "yugioh-write-secret",
  "grant_types": ["client_credentials"],
  "response_types": ["token"],
  "scope": "Write",
  "audience": ["yugioh-api"],
  "token_endpoint_auth_method": "client_secret_basic",
  "access_token_strategy": "jwt"
}
```

---

## 🔄 Endpoints CRUD

| Método | Ruta                     | Descripción                      |
|--------|--------------------------|----------------------------------|
| POST   | /api/monsters            | Crear nuevo monstruo             |
| GET    | /api/monsters/:id        | Obtener un monstruo por ID       |
| PUT    | /api/monsters/:id        | Actualizar un monstruo por ID    |
| DELETE | /api/monsters/:id        | Eliminar un monstruo por ID      |
| GET    | /api/monsters?page=&size=| Obtener monstruos con paginación |

---

## 🧪 Ejemplos para probar (Swagger o Postman)

- Swagger disponible en: `http://localhost:8080/api-docs`
- Usar tokens generados por Hydra para autenticarse:
   - Agrega en Authorization: `Bearer <TOKEN>`

---

## 🖼️ Capturas de funcionamiento

Incluye imágenes de prueba de todos los endpoints usando Postman o Swagger:
- ✅ Crear (`POST`)
- ✅ Obtener por ID (`GET`)
- ✅ Listar con paginación (`GET`)
- ✅ Actualizar (`PUT`)
- ✅ Eliminar (`DELETE`)
- ✅ Registro de clientes en Hydra (`POST`)

---

## ✅ Buenas prácticas implementadas

- Códigos HTTP apropiados (200, 201, 400, 401, 403, 404, 500)
- Formato JSON estructurado
- Rutas RESTful bajo `/api/monsters`
