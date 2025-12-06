# Guía de Despliegue en Vercel

## Requisitos previos
- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub conectado a Vercel
- Variables de entorno configuradas

## Pasos para desplegar

### 1. **Conectar repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz click en "Add New..." → "Project"
   - Selecciona tu repositorio `gestor-productos` de GitHub
   - Vercel detectará automáticamente que es un proyecto Node.js

### 2. **Configurar variables de entorno**
   En la sección "Environment Variables" de Vercel, añade:

   ```
   JWT_SECRET=tu_secret_key_seguro
   ```

   **Nota:** El archivo `.env` no se sube a GitHub (está en `.gitignore`), así que debe configurarse en Vercel.

### 3. **Configuración del build**
   - **Build Command:** `npm install` (automático)
   - **Output Directory:** Vercel lo detecta automáticamente
   - **Install Command:** `npm install`

   Vercel usará `vercel.json` para la configuración de rutas.

### 4. **Desplegar**
   - Click en "Deploy"
   - Vercel construirá y desplegará automáticamente
   - Recibirás una URL como: `https://gestor-productos.vercel.app`

### 5. **Deploy automático**
   Después del primer despliegue:
   - Cualquier push a `main` desplegará automáticamente
   - Los pull requests generarán deployments de preview

## Archivo de configuración: vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api"
    }
  ]
}
```

**Explicación:**
- `api/index.js` es el punto de entrada serverless
- Todas las rutas (`/*`) se redirigen a `/api` (Express)
- Vercel ejecuta Express como función serverless

## Estructura de directorios para Vercel

```
gestor-productos/
├── api/
│   └── index.js          (Punto de entrada serverless)
├── src/
│   ├── app.js            (Aplicación Express)
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   └── config/
├── index.js              (Desarrollo local)
├── package.json
├── vercel.json           (Configuración de Vercel)
├── .vercelignore         (Archivos a ignorar)
├── .gitignore
└── .env                  (Local, no se sube)
```

## Probar localmente antes de desplegar

Simula el entorno de Vercel localmente:

```bash
npm install -g vercel
vercel dev
```

Esto ejecutará tu aplicación en http://localhost:3000 igual que en producción.

## Endpoints en Vercel

Una vez desplegado, accede a los endpoints con la URL de Vercel:

```
POST   https://gestor-productos.vercel.app/auth/login
GET    https://gestor-productos.vercel.app/products
GET    https://gestor-productos.vercel.app/products/:id
POST   https://gestor-productos.vercel.app/products/create
PATCH  https://gestor-productos.vercel.app/products/:id
DELETE https://gestor-productos.vercel.app/products/:id
```

### Ejemplo: Login en Vercel

```bash
curl -X POST https://gestor-productos.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'
```

## Solución de problemas

### Error: "Cannot find module"
- Asegúrate de que todas las dependencias están en `package.json`
- Ejecuta `npm install` localmente para generar `package-lock.json`

### Error 502/503
- Verifica que `JWT_SECRET` está configurada en Vercel
- Revisa los logs en el panel de Vercel → "Functions" → "Logs"

### Variables de entorno no funcionan
- Variables debe estar en Vercel Dashboard bajo "Settings" → "Environment Variables"
- Redeploy después de añadir variables

### Problema con Firebase
- Asegúrate de que `firebaseKey.json` está en `.gitignore`
- Configura credenciales como variables de entorno en Vercel

## Añadir variables sensibles en Vercel (Dashboard y CLI)

### Opción A — Dashboard (recomendado para la mayoría)

1. Ve a tu proyecto en Vercel: `https://vercel.com/bernardo-carlos-cameras-projects/gestor-productos`
2. En el menú lateral, selecciona **Settings → Environment Variables**.
3. Añade las siguientes variables para el entorno `Production` (marca **Environment**: Production):

  - `FIREBASE_KEY_BASE64`: pega aquí la cadena base64 completa del JSON de la cuenta de servicio (sensible).
  - `JWT_SECRET`: tu clave secreta para firmar tokens (sensible).

4. Marca ambas variables como **Encrypted** / **Protected** si Vercel lo ofrece.
5. Después de añadirlas, redeploy del proyecto (Dashboard → Deployments → Redeploy).

> Nota: la cadena `FIREBASE_KEY_BASE64` es larga; pégala como una sola línea sin saltos de línea.

### Opción B — CLI (no interactiva)

Puedes añadir variables por CLI desde tu máquina local (ya autenticada con `vercel login`). Ejemplos:

```powershell
# Añadir FIREBASE_KEY_BASE64 (producción)
echo $env:FIREBASE_KEY_BASE64_VALUE | vercel env add FIREBASE_KEY_BASE64 production

# Añadir JWT_SECRET (producción)
echo "tu_clave_secreta_muy_segura_cambiar_en_produccion_12345" | vercel env add JWT_SECRET production
```

Si la variable ya existe en cualquier ambiente, primero elimínala y vuelve a añadirla:

```powershell
vercel env rm FIREBASE_KEY_BASE64 --yes
vercel env add FIREBASE_KEY_BASE64 production
```

### Comprobaciones finales

- Asegúrate de que `FIREBASE_KEY_BASE64` y `JWT_SECRET` aparecen en **Settings → Environment Variables** para `Production`.
- Haz un `vercel --prod` o utiliza el botón **Redeploy** en el Dashboard.
- Revisa logs en Dashboard → Functions para verificar la inicialización de Firebase.

## Probar en Postman

1. Abre Postman y crea una nueva colección llamada `gestor-productos`.
2. Crea una variable de colección `base_url` con el valor de tu deployment, por ejemplo:

   - `https://gestor-productos-51bksp6cx-bernardo-carlos-cameras-projects.vercel.app`

3. Importa la colección `postman/gestor-productos.postman_collection.json` desde el repositorio (o crea las requests manualmente):

   - `POST {{base_url}}/auth/login` → Body JSON: `{ "email": "test@gmail.com", "password": "123456" }` (guardará `token` en variable)
   - `GET {{base_url}}/products` → Lista productos (sin auth)
   - `POST {{base_url}}/products/create` → Body JSON para crear producto (añade header `Authorization: Bearer {{token}}`)

4. Para automatizar la extracción del token después del login, añade un test en la request `auth/login` en Postman:

```javascript
pm.test('Save token', function () {
  var json = pm.response.json();
  if (json && json.token) {
    pm.collectionVariables.set('token', json.token);
  }
});
```

5. Asegúrate de usar `Authorization: Bearer {{token}}` en las requests protegidas.

### Notas
- Si tu deployment sigue mostrando la pantalla de autenticación, desactiva Deployment Protection o usa el bypass token (ver sección anterior).
- La colección de Postman incluida usa variables para que puedas cambiar `base_url` fácilmente.

## Monitoreo y logs

En el dashboard de Vercel:
1. Ve a tu proyecto
2. Tab "Deployments" → Ver historial de despliegues
3. Tab "Functions" → Ver logs en tiempo real
4. Tab "Settings" → Configurar más opciones

## Redeploy manual

Si necesitas redeploy sin cambios:
1. Dashboard de Vercel → Proyecto
2. Botón "Redeploy"
3. Selecciona el commit a redeplegar

## Rollback a versión anterior

1. En "Deployments", encuentra el deployment anterior que funciona
2. Haz click en los 3 puntos → "Promote to Production"

## Dominio personalizado (opcional)

1. Dashboard → Proyecto → Settings → Domains
2. Añade tu dominio personalizado
3. Sigue las instrucciones de DNS

## Monitorar rendimiento

Vercel proporciona análiticas en:
- Dashboard → Analytics
- Puedes ver tiempo de respuesta, requests, errores, etc.

---

**¿Necesitas ayuda?** Revisa la [documentación oficial de Vercel](https://vercel.com/docs) o los [logs de tu proyecto](https://vercel.com/dashboard).
