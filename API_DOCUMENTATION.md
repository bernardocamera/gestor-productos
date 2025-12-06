# API REST - Gestor de Productos

## 🚀 Iniciando el servidor

```bash
npm run start
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📋 RESUMEN DE ENDPOINTS

| Método | Ruta | Protegida | Descripción |
|--------|------|-----------|-------------|
| POST | `/auth/login` | No | Obtener Bearer Token |
| GET | `/products` | No | Listar todos los productos |
| GET | `/products/:id` | No | Obtener producto por ID |
| POST | `/products/create` | Sí | Crear nuevo producto |
| PATCH | `/products/:id` | Sí | Actualizar producto |
| DELETE | `/products/:id` | Sí | Eliminar producto |

---

## 🔐 AUTENTICACIÓN

### 1. POST /auth/login - Obtener Token

**Descripción:** Genera un JWT Bearer Token para acceder a rutas protegidas.

**Credenciales:**
- Email: `test@gmail.com`
- Contraseña: `123456`

**Postman:**
- Método: POST
- URL: `http://localhost:3000/auth/login`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
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
