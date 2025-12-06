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
