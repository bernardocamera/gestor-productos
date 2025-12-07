# 🛒 Gestor de Productos

> Sistema de gestión de productos con autenticación JWT, construido con Node.js, Express y Firebase Firestore. Deployado en Vercel con soporte serverless.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Admin-orange.svg)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg)](https://vercel.com/)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Instalación Local](#-instalación-local)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Documentación](#-documentación)
- [Deploy](#-deploy-en-vercel)
- [Pruebas](#-pruebas-con-postman)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribución](#-contribución)

## ✨ Características

### 🔐 Autenticación JWT
- Tokens seguros con expiración de 2 horas
- Middleware de autenticación para rutas protegidas
- Validación de credenciales con bcrypt
- Headers Authorization Bearer

### 📦 Gestión de Productos
- CRUD completo (Create, Read, Update, Delete)
- Almacenamiento en Firebase Firestore
- Validación de datos
- Endpoints públicos y protegidos

### 🚀 Infraestructura
- **Express.js** - Framework web rápido y minimalista
- **Firebase Firestore** - Base de datos NoSQL en tiempo real
- **CORS** - Peticiones cross-origin habilitadas
- **Serverless** - Deployado en Vercel con funciones serverless
- **Environment Variables** - Configuración segura

## 🛠️ Tecnologías

- **Runtime:** Node.js v18+
- **Framework:** Express.js 4.x
- **Base de Datos:** Firebase Firestore
- **Autenticación:** JSON Web Tokens (JWT)
- **Deploy:** Vercel
- **Herramientas:** dotenv, body-parser, cors

## 🚀 Instalación Local

### Requisitos Previos
- Node.js v18 o superior
- npm v8 o superior
- Cuenta de Firebase (para Firestore)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/bernardocamera/gestor-productos.git
cd gestor-productos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus valores:
```env
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiar_en_produccion_12345
FIREBASE_KEY_BASE64=<tu_firebase_key_en_base64>
NODE_ENV=development
```

4. **Configurar Firebase**
- Coloca tu archivo `firebaseKey.json` en `src/config/`
- O usa la variable `FIREBASE_KEY_BASE64` (recomendado)

5. **Iniciar el servidor**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `JWT_SECRET` | Clave secreta para JWT | `mi_clave_super_segura_123` |
| `FIREBASE_KEY_BASE64` | Credenciales Firebase en base64 | `ew0KICAidHlwZSI6...` |
| `NODE_ENV` | Entorno de ejecución | `development` / `production` |

### Credenciales de Desarrollo

Para pruebas locales (hardcodeadas):
- **Email:** `test@gmail.com`
- **Password:** `123456`

## 🎯 Uso

### Endpoints Disponibles

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| `POST` | `/auth/login` | No | Obtener token JWT |
| `GET` | `/products` | No | Listar todos los productos |
| `GET` | `/products/:id` | No | Obtener producto por ID |
| `POST` | `/products/create` | **Sí** | Crear nuevo producto |
| `PATCH` | `/products/:id` | **Sí** | Actualizar producto |
| `DELETE` | `/products/:id` | **Sí** | Eliminar producto |

### Ejemplo Rápido

```bash
# 1. Obtener token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'

# 2. Listar productos
curl http://localhost:3000/products

# 3. Crear producto (con token)
curl -X POST http://localhost:3000/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{"name":"Cámara Sony","price":1999.99,"stock":5}'
```

## 📚 Documentación

- **[API Documentation](./API_DOCUMENTATION.md)** - Documentación completa de endpoints con ejemplos
- **[Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Guía paso a paso para deploy en Vercel
- **[Postman Collection](./postman/gestor-productos.postman_collection.json)** - Colección lista para importar

## 🌐 Deploy en Vercel

El proyecto está configurado para deployment automático en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Deploy automático con cada push a `main`

Ver guía completa: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

**URL de Producción:** `https://gestor-productos-[hash].vercel.app`

## 🧪 Pruebas con Postman

1. Importa la colección desde `postman/gestor-productos.postman_collection.json`
2. Configura la variable `base_url`:
   - Local: `http://localhost:3000`
   - Producción: `https://gestor-productos-[hash].vercel.app`
3. Ejecuta la request `Auth - Login` para obtener el token
4. El token se guarda automáticamente para requests protegidas

## 📁 Estructura del Proyecto

```
gestor-productos/
├── api/
│   └── index.js              # Entry point para Vercel serverless
├── src/
│   ├── app.js                # Configuración de Express
│   ├── auth/
│   │   └── jwt.js            # Utilidades JWT
│   ├── config/
│   │   └── firebaseKey.json  # Credenciales Firebase (no versionado)
│   ├── controllers/
│   │   └── productController.js
│   ├── data/
│   │   └── data.js           # Inicialización Firebase
│   ├── middlewares/
│   │   └── authMiddleware.js # Validación JWT
│   ├── models/
│   │   └── productModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   └── services/
│       └── productService.js
├── postman/
│   └── gestor-productos.postman_collection.json
├── index.js                  # Entry point local
├── package.json
├── vercel.json              # Config Vercel
├── .env.example             # Template de variables
├── .gitignore
├── README.md
├── API_DOCUMENTATION.md
└── VERCEL_DEPLOYMENT.md
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Bernardo Carlos Camera**
- GitHub: [@bernardocamera](https://github.com/bernardocamera)
- Email: bernardo.camera@dicsys.com

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub
[
  {
    "id": "docId1",
    "title": "Producto 1",
    "price": 29.99,
    "description": "Descripción del producto"
  }
]
```

#### Obtener producto por ID
```
GET /products/:id
```

**Respuesta (200):**
```json
{
  "id": "docId1",
  "title": "Producto 1",
  "price": 29.99,
  "description": "Descripción del producto"
}
```

#### Crear producto (Protegida)
```
POST /products/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nuevo Producto",
  "price": 49.99,
  "description": "Descripción del nuevo producto"
}
```

**Respuesta (201):**
```json
{
  "id": "newDocId",
  "title": "Nuevo Producto",
  "price": 49.99,
  "description": "Descripción del nuevo producto"
}
```

#### Eliminar producto (Protegida)
```
DELETE /products/:id
Authorization: Bearer <token>
```

**Respuesta (200):**
```json
{
  "message": "Producto eliminado",
  "deleted": {
    "message": "Documento docId eliminado correctamente"
  }
}
```

## 🔐 Autenticación y Protección de Rutas

### Uso de Bearer Token

Para acceder a rutas protegidas, incluye el token en el header `Authorization`:

```bash
curl -H "Authorization: Bearer <tu_token>" http://localhost:3000/products/create
```

### Rutas Protegidas
- `POST /products/create` - Requiere token válido
- `DELETE /products/:id` - Requiere token válido

### Rutas Públicas
- `GET /products` - Sin autenticación
- `GET /products/:id` - Sin autenticación
- `POST /auth/login` - Sin autenticación

## 📁 Estructura del Proyecto

```
gestor-productos/
├── index.js                          # Punto de entrada
├── package.json                      # Dependencias
├── .env                              # Variables de entorno
├── .gitignore                        # Archivos a ignorar en git
├── vercel.json                       # Configuración de Vercel
├── README.md                         # Esta documentación
└── src/
    ├── app.js                        # Configuración de Express
    ├── config/
    │   └── firebaseKey.json          # Credenciales de Firebase (Git ignore)
    ├── controllers/
    │   ├── authController.js         # Lógica de autenticación
    │   └── productController.js      # Lógica de productos
    ├── middlewares/
    │   └── authMiddleware.js         # Middleware de autenticación JWT
    ├── models/
    │   └── productModel.js           # Modelos de Firestore
    ├── routes/
    │   ├── authRoutes.js             # Rutas de autenticación
    │   └── productRoutes.js          # Rutas de productos
    ├── services/
    │   └── productService.js         # Servicios de negocio
    └── data/
        └── data.js                   # Inicialización de Firebase
```

## 🔧 Dependencias

- **express** (5.1.0) - Framework web
- **cors** (2.8.5) - Soporte CORS
- **body-parser** (2.2.0) - Parser de JSON
- **dotenv** (17.2.3) - Variables de entorno
- **firebase** (12.6.0) - SDK de Firebase
- **firebase-admin** (13.6.0) - Admin SDK de Firebase
- **jsonwebtoken** (9.0.2) - Generación y verificación de JWT

## 🗄️ Base de Datos

### Firebase Firestore

El proyecto utiliza **Firebase Firestore** como base de datos en la nube.

**Colección:** `productos`

**Estructura de documento:**
```json
{
  "title": "string",
  "price": "number",
  "description": "string"
}
```

### Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Firestore Database
3. Crear una colección llamada `productos`
4. Generar una clave de servicio (Service Account Key)
5. Guardar el archivo JSON en `src/config/firebaseKey.json`

## 📝 Variables de Entorno

Crear archivo `.env` con:

```env
# Puerto del servidor
PORT=3000

# Clave secreta para firmar JWT
JWT_SECRET=tu_clave_secreta_muy_segura_cambiar_en_produccion_12345
```

## 🧪 Ejemplo de Uso

### 1. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

Respuesta:
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Obtener Productos
```bash
curl http://localhost:3000/products
```

### 3. Crear Producto (con autenticación)
```bash
curl -X POST http://localhost:3000/products/create \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"title":"Laptop","price":999.99,"description":"Laptop gaming"}'
```

### 4. Eliminar Producto (con autenticación)
```bash
curl -X DELETE http://localhost:3000/products/docId \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## ⚠️ Seguridad

- Las credenciales se encuentran **hardcodeadas** para desarrollo. En producción, usar una base de datos.
- El archivo `firebaseKey.json` está en `.gitignore` y no debe ser compartido.
- El `JWT_SECRET` debe ser una cadena larga y segura. Cambiar en producción.
- Los tokens expiran en 2 horas por defecto.

## 🚢 Deploy

### Vercel

El proyecto está configurado para despliegue en Vercel con archivo `vercel.json`.

**Pasos rápidos:**
1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Vercel detectará automáticamente `vercel.json`
3. Añade variable de entorno `JWT_SECRET` en el dashboard
4. ¡Listo! Deploy en minutos

**Probar localmente:**
```bash
npm install -g vercel
vercel dev    # Simula producción en http://localhost:3000
```

**URL en producción:**
```
https://gestor-productos.vercel.app
```

Para guía completa, ver `VERCEL_DEPLOYMENT.md`

## 📞 Solución de Problemas

### Error: "Cannot find module 'cors'"
```bash
npm install cors
```

### Error: "Cannot find module 'body-parser'"
```bash
npm install body-parser
```

### Error: "Token inválido o expirado"
Genera un nuevo token con `/auth/login`

### Puerto 3000 en uso
Cambiar `PORT` en `.env` o liberar el puerto:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

## 📄 Licencia

ISC

## 👨‍💻 Autor

Bernardo Camera

## 🎯 Próximas Mejoras

- [ ] Autenticación contra base de datos real
- [ ] Roles y permisos
- [ ] Validación de datos más robusta
- [ ] Tasa de limitación (Rate Limiting)
- [ ] Logs centralizados
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger
- [ ] Refresh tokens