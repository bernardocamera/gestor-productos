# Gestor de Productos

Sistema de gestión de productos con autenticación JWT construido con Node.js, Express y Firebase.

## 📋 Características

### Autenticación
- **JWT (JSON Web Tokens)** para autenticación segura
- **Credenciales hardcodeadas** para desarrollo:
  - Email: `test@gmail.com`
  - Contraseña: `123456`
- Tokens con expiración de 2 horas
- Middleware de autenticación para proteger rutas

### Gestión de Productos
- **Obtener todos los productos** - Acceso público
- **Obtener producto por ID** - Acceso público
- **Crear producto** - Requiere autenticación
- **Eliminar producto** - Requiere autenticación
- Integración con **Firebase Firestore** para almacenamiento en la nube

### Infraestructura
- **Express.js** como framework web
- **CORS** habilitado para peticiones de origen cruzado
- **body-parser** para interpretar JSON en el cuerpo de peticiones
- **dotenv** para variables de entorno
- **firebase-admin** para conexión a Firestore
- Middleware 404 personalizado

## 🚀 Instalación

### Requisitos
- Node.js v14 o superior
- npm v6 o superior

### Pasos

1. **Clonar o descargar el proyecto**
```bash
cd gestor-productos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto:
```
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiar_en_produccion_12345
```

4. **Ejecutar el servidor**
```bash
npm run start
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Endpoints de la API

### Autenticación

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta error (401):**
```json
{
  "message": "Credenciales inválidas"
}
```

### Productos

#### Obtener todos los productos
```
GET /products
```

**Respuesta (200):**
```json
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

El proyecto incluye `vercel.json` para deploy en Vercel.

```bash
vercel
```

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