# 📘 API REST - Gestor de Productos

> Documentación completa de endpoints, ejemplos y códigos de respuesta

## 🌐 Base URL

- **Local:** `http://localhost:3000`
- **Producción:** `https://gestor-productos-[hash].vercel.app`

## 📋 Índice de Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| `POST` | `/auth/login` | ❌ | Obtener Bearer Token |
| `GET` | `/products` | ❌ | Listar todos los productos |
| `GET` | `/products/:id` | ❌ | Obtener producto por ID |
| `POST` | `/products/create` | ✅ | Crear nuevo producto |
| `PATCH` | `/products/:id` | ✅ | Actualizar producto parcialmente |
| `DELETE` | `/products/:id` | ✅ | Eliminar producto |

---

## 🔐 Autenticación

### POST /auth/login

Genera un JWT Bearer Token válido por 2 horas para acceder a rutas protegidas.

**Credenciales de desarrollo:**
- Email: `test@gmail.com`
- Password: `123456`

#### Request

```http
POST /auth/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "test@gmail.com",
  "password": "123456"
}
```

#### Responses

**✅ 200 OK - Login exitoso**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzMzNTE2NDAwLCJleHAiOjE3MzM1MjM2MDB9.xyz..."
}
```

**❌ 401 Unauthorized - Credenciales inválidas**
```json
{
  "message": "Credenciales inválidas"
}
```

**❌ 400 Bad Request - Datos faltantes**
```json
{
  "message": "Email y contraseña son requeridos"
}
```

#### Ejemplos

**cURL**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

**JavaScript (Fetch)**
```javascript
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@gmail.com',
    password: '123456'
  })
});
const data = await response.json();
console.log(data.token);
```

**PowerShell**
```powershell
$body = @{ email='test@gmail.com'; password='123456' } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $body -ContentType 'application/json'
```

---

## 📦 Productos

### GET /products

Obtiene la lista completa de productos. **No requiere autenticación.**

#### Request

```http
GET /products HTTP/1.1
Host: localhost:3000
```

#### Responses

**✅ 200 OK**
```json
[
  {
    "id": "abc123",
    "name": "Cámara Sony A7III",
    "price": 1999.99,
    "stock": 5,
    "createdAt": "2025-12-06T20:00:00Z"
  },
  {
    "id": "def456",
    "name": "Lente Canon 50mm",
    "price": 299.99,
    "stock": 12,
    "createdAt": "2025-12-05T15:30:00Z"
  }
]
```

**✅ 200 OK - Sin productos**
```json
[]
```

#### Ejemplos

**cURL**
```bash
curl http://localhost:3000/products
```

**JavaScript**
```javascript
const products = await fetch('http://localhost:3000/products').then(r => r.json());
```

---

### GET /products/:id

Obtiene un producto específico por su ID. **No requiere autenticación.**

#### Request

```http
GET /products/abc123 HTTP/1.1
Host: localhost:3000
```

#### Responses

**✅ 200 OK**
```json
{
  "id": "abc123",
  "name": "Cámara Sony A7III",
  "price": 1999.99,
  "stock": 5,
  "description": "Cámara full-frame de 24MP",
  "createdAt": "2025-12-06T20:00:00Z"
}
```

**❌ 404 Not Found**
```json
{
  "message": "Producto no encontrado"
}
```

#### Ejemplos

**cURL**
```bash
curl http://localhost:3000/products/abc123
```

---

### POST /products/create

Crea un nuevo producto. **Requiere autenticación JWT.**

#### Request

```http
POST /products/create HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Cámara Sony A7III",
  "price": 1999.99,
  "stock": 5,
  "description": "Cámara full-frame de 24MP"
}
```

#### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | string | ✅ | Nombre del producto |
| `price` | number | ✅ | Precio (>0) |
| `stock` | number | ✅ | Cantidad en stock (>=0) |
| `description` | string | ❌ | Descripción del producto |

#### Responses

**✅ 201 Created**
```json
{
  "message": "Producto creado exitosamente",
  "id": "xyz789",
  "product": {
    "id": "xyz789",
    "name": "Cámara Sony A7III",
    "price": 1999.99,
    "stock": 5,
    "description": "Cámara full-frame de 24MP",
    "createdAt": "2025-12-06T21:00:00Z"
  }
}
```

**❌ 401 Unauthorized - Sin token**
```json
{
  "message": "Token no proporcionado"
}
```

**❌ 403 Forbidden - Token inválido**
```json
{
  "message": "Token inválido o expirado"
}
```

**❌ 400 Bad Request - Datos inválidos**
```json
{
  "message": "Faltan campos requeridos: name, price, stock"
}
```

#### Ejemplos

**cURL**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3000/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Cámara Sony A7III",
    "price": 1999.99,
    "stock": 5,
    "description": "Cámara full-frame"
  }'
```

**JavaScript**
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const response = await fetch('http://localhost:3000/products/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Cámara Sony A7III',
    price: 1999.99,
    stock: 5
  })
});
```

---

### PATCH /products/:id

Actualiza parcialmente un producto existente. **Requiere autenticación JWT.**

#### Request

```http
PATCH /products/abc123 HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "price": 1799.99,
  "stock": 3
}
```

#### Campos Actualizables

Puedes enviar solo los campos que deseas actualizar:
- `name` (string)
- `price` (number, >0)
- `stock` (number, >=0)
- `description` (string)

#### Responses

**✅ 200 OK**
```json
{
  "message": "Producto actualizado exitosamente",
  "product": {
    "id": "abc123",
    "name": "Cámara Sony A7III",
    "price": 1799.99,
    "stock": 3,
    "description": "Cámara full-frame de 24MP",
    "updatedAt": "2025-12-06T22:00:00Z"
  }
}
```

**❌ 404 Not Found**
```json
{
  "message": "Producto no encontrado"
}
```

**❌ 401 Unauthorized**
```json
{
  "message": "Token no proporcionado"
}
```

#### Ejemplos

**cURL**
```bash
curl -X PATCH http://localhost:3000/products/abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"price": 1799.99, "stock": 3}'
```

---

### DELETE /products/:id

Elimina un producto por su ID. **Requiere autenticación JWT.**

#### Request

```http
DELETE /products/abc123 HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Responses

**✅ 200 OK**
```json
{
  "message": "Producto eliminado exitosamente",
  "id": "abc123"
}
```

**❌ 404 Not Found**
```json
{
  "message": "Producto no encontrado"
}
```

**❌ 401 Unauthorized**
```json
{
  "message": "Token no proporcionado"
}
```

#### Ejemplos

**cURL**
```bash
curl -X DELETE http://localhost:3000/products/abc123 \
  -H "Authorization: Bearer $TOKEN"
```

**JavaScript**
```javascript
await fetch(`http://localhost:3000/products/${productId}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## 🔑 Autenticación en Requests

### Headers Requeridos

Para endpoints protegidos (✅):

```http
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

### Flujo Completo

1. **Login** para obtener token:
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}' \
  | jq -r '.token')
```

2. **Usar token** en requests protegidas:
```bash
curl http://localhost:3000/products/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Producto","price":100,"stock":10}'
```

---

## ⚠️ Códigos de Estado HTTP

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| `200` | OK | Request exitosa |
| `201` | Created | Recurso creado exitosamente |
| `400` | Bad Request | Datos inválidos o faltantes |
| `401` | Unauthorized | Token faltante o inválido |
| `403` | Forbidden | Token expirado |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error del servidor |

---

## 📝 Notas Importantes

1. **Tokens JWT:** Expiran en 2 horas. Debes hacer login nuevamente después.
2. **CORS:** Habilitado para todas las origins en desarrollo.
3. **Validación:** Todos los campos requeridos se validan en el servidor.
4. **IDs:** Generados automáticamente por Firebase Firestore.
5. **Timestamps:** Todos los productos tienen `createdAt` y `updatedAt` automáticos.

---

## 🧪 Pruebas con Postman

Importa la colección desde `postman/gestor-productos.postman_collection.json`:

1. Variables de colección:
   - `base_url`: URL del servidor
   - `token`: Se guarda automáticamente después del login

2. Test automático en login:
```javascript
pm.test('Save token', function () {
  var json = pm.response.json();
  if (json && json.token) {
    pm.collectionVariables.set('token', json.token);
  }
});
```

3. Requests configuradas con `{{base_url}}` y `{{token}}`

---

## 🐛 Troubleshooting

### Error: "Token no proporcionado"
- Verifica que incluyas el header `Authorization: Bearer <token>`
- El formato debe ser exacto: `Bearer` (con mayúscula) + espacio + token

### Error: "Token inválido o expirado"
- Haz login nuevamente para obtener un token fresco
- Verifica que `JWT_SECRET` sea el mismo en local y producción

### Error 500 en Vercel
- Verifica que `FIREBASE_KEY_BASE64` y `JWT_SECRET` estén configuradas en Vercel Dashboard
- Revisa los logs en Vercel → Functions → Runtime Logs

---

**Última actualización:** Diciembre 2025
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Curl:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

---

## 📦 PRODUCTOS - ENDPOINTS

### 2. GET /products - Listar todos (Público)

**Descripción:** Obtiene todos los productos de la base de datos.

**Postman:**
- Método: GET
- URL: `http://localhost:3000/products`
- Headers: Ninguno requerido

**Respuesta exitosa (200):**
```json
[
  {
    "id": "doc_id_1",
    "title": "Café Arabica Premium Gourmet",
    "price": 14.99,
    "description": "Granos de café arábica 100% premium..."
  },
  {
    "id": "doc_id_2",
    "title": "Té Verde Matcha Orgánico",
    "price": 12.99,
    "description": "Té matcha puro en polvo..."
  }
]
```

**Curl:**
```bash
curl http://localhost:3000/products
```

---

### 3. GET /products/:id - Obtener por ID (Público)

**Descripción:** Obtiene un producto específico por su ID.

**Parámetro:**
- `id`: ID del documento en Firestore

**Postman:**
- Método: GET
- URL: `http://localhost:3000/products/l6Hzr5gY07WSUIKLsMw1`
- Headers: Ninguno requerido

**Respuesta exitosa (200):**
```json
{
  "id": "l6Hzr5gY07WSUIKLsMw1",
  "title": "Café Arabica Premium Gourmet",
  "price": 14.99,
  "description": "Granos de café arábica 100% premium..."
}
```

**Error (404) - Documento no encontrado:**
```json
{
  "error": "Documento con ID l6Hzr5gY07WSUIKLsMw1 no encontrado"
}
```

**Curl:**
```bash
curl http://localhost:3000/products/l6Hzr5gY07WSUIKLsMw1
```

---

### 4. POST /products/create - Crear Producto (Protegida)

**Descripción:** Crea un nuevo producto. Requiere autenticación.

**Headers requeridos:**
- `Content-Type: application/json`
- `Authorization: Bearer <TOKEN>`

**Body (JSON):**
```json
{
  "title": "Café Arabica Premium Gourmet",
  "price": 14.99,
  "description": "Granos de café arábica 100% premium, tostado medio, ideal para espresso y filtro. Bolsa 500g"
}
```

**Postman:**
- Método: POST
- URL: `http://localhost:3000/products/create`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Body (JSON): Ver arriba

**Respuesta exitosa (201):**
```json
{
  "id": "new_doc_id_123",
  "title": "Café Arabica Premium Gourmet",
  "price": 14.99,
  "description": "Granos de café arábica 100% premium..."
}
```

**Errores:**
- 400 - Falta `title` o `price`
- 401 - Token no proporcionado o inválido

**Curl:**
```bash
curl -X POST http://localhost:3000/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Café Arabica Premium Gourmet",
    "price": 14.99,
    "description": "Granos de café arábica 100% premium, tostado medio, ideal para espresso y filtro. Bolsa 500g"
  }'
```

---

### 5. PATCH /products/:id - Actualizar Producto (Protegida)

**Descripción:** Actualiza campos de un producto existente.

**Parámetro:**
- `id`: ID del producto a actualizar

**Headers requeridos:**
- `Content-Type: application/json`
- `Authorization: Bearer <TOKEN>`

**Body (JSON) - Ejemplo actualizar solo descripción:**
```json
{
  "description": "Nueva descripción actualizada del producto"
}
```

**Body (JSON) - Ejemplo actualizar múltiples campos:**
```json
{
  "title": "Café Arabica Premium Gourmet - Edición Especial",
  "price": 16.99,
  "description": "Granos actualizado con nueva información"
}
```

**Postman:**
- Método: PATCH
- URL: `http://localhost:3000/products/l6Hzr5gY07WSUIKLsMw1`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Body (JSON): Ver arriba

**Respuesta exitosa (200):**
```json
{
  "id": "l6Hzr5gY07WSUIKLsMw1",
  "title": "Café Arabica Premium Gourmet - Edición Especial",
  "price": 16.99,
  "description": "Granos actualizado con nueva información"
}
```

**Errores:**
- 404 - Producto no encontrado
- 401 - Token no proporcionado o inválido

**Curl:**
```bash
curl -X PATCH http://localhost:3000/products/l6Hzr5gY07WSUIKLsMw1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "description": "Nueva descripción actualizada del producto"
  }'
```

---

### 6. DELETE /products/:id - Eliminar Producto (Protegida)

**Descripción:** Elimina un producto de la base de datos.

**Parámetro:**
- `id`: ID del producto a eliminar

**Headers requeridos:**
- `Authorization: Bearer <TOKEN>`

**Postman:**
- Método: DELETE
- URL: `http://localhost:3000/products/l6Hzr5gY07WSUIKLsMw1`
- Headers:
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Body: Vacío

**Respuesta exitosa (200):**
```json
{
  "message": "Producto eliminado",
  "deleted": {
    "message": "Documento l6Hzr5gY07WSUIKLsMw1 eliminado correctamente"
  }
}
```

**Errores:**
- 404 - Producto no encontrado
- 401 - Token no proporcionado o inválido

**Curl:**
```bash
curl -X DELETE http://localhost:3000/products/l6Hzr5gY07WSUIKLsMw1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🔄 FLUJO COMPLETO DE PRUEBA

### Paso 1: Obtener Token
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```
**Copia el valor de `token` de la respuesta**

### Paso 2: Listar Productos
```bash
curl http://localhost:3000/products
```

### Paso 3: Crear Producto
```bash
curl -X POST http://localhost:3000/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Café Arabica Premium Gourmet",
    "price": 14.99,
    "description": "Granos de café arábica 100% premium, tostado medio"
  }'
```
**Copia el `id` de la respuesta**

### Paso 4: Obtener Producto
```bash
curl http://localhost:3000/products/ID_DEL_PRODUCTO
```

### Paso 5: Actualizar Producto
```bash
curl -X PATCH http://localhost:3000/products/ID_DEL_PRODUCTO \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"description":"Descripción actualizada"}'
```

### Paso 6: Eliminar Producto
```bash
curl -X DELETE http://localhost:3000/products/ID_DEL_PRODUCTO \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ❌ CÓDIGOS DE ERROR

| Código | Descripción |
|--------|-------------|
| 200 | OK - Petición exitosa (GET, PATCH, DELETE) |
| 201 | Created - Producto creado (POST /products/create) |
| 400 | Bad Request - Datos faltantes o inválidos |
| 401 | Unauthorized - Token faltante o inválido |
| 404 | Not Found - Ruta o recurso no encontrado |
| 500 | Internal Server Error - Error en el servidor |

---

## 📝 NOTAS IMPORTANTES

1. **Credenciales hardcodeadas (desarrollo):**
   - Email: `test@gmail.com`
   - Contraseña: `123456`

2. **Token expira en 2 horas** - Si obtienes error 401, genera uno nuevo con `/auth/login`

3. **Rutas protegidas** - Requieren header `Authorization: Bearer <token>`
   - POST /products/create
   - PATCH /products/:id
   - DELETE /products/:id

4. **Rutas públicas** - No requieren autenticación
   - GET /products
   - GET /products/:id
   - POST /auth/login

5. **Firestore** - Los datos se guardan en la base de datos en la nube, no en local

---

## 🧪 SCRIPT DE PRUEBA RÁPIDA (Bash)

```bash
#!/bin/bash

# Obtener token
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}' | grep -oP '"token":"\K[^"]*')

echo "Token: $TOKEN"

# Crear producto
PRODUCT_ID=$(curl -s -X POST http://localhost:3000/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Producto",
    "price": 9.99,
    "description": "Producto de prueba"
  }' | grep -oP '"id":"\K[^"]*')

echo "Producto creado: $PRODUCT_ID"

# Listar productos
echo "Listando productos..."
curl -s http://localhost:3000/products | jq '.'

# Obtener producto específico
echo "Obteniendo producto específico..."
curl -s http://localhost:3000/products/$PRODUCT_ID | jq '.'

# Actualizar producto
echo "Actualizando producto..."
curl -s -X PATCH http://localhost:3000/products/$PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"description":"Descripción actualizada"}' | jq '.'

# Eliminar producto
echo "Eliminando producto..."
curl -s -X DELETE http://localhost:3000/products/$PRODUCT_ID \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo "Pruebas completadas"
```

---

✅ **API lista para usar. ¡Adelante con las pruebas!**
