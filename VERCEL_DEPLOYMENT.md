# 🚀 Guía de Despliegue en Vercel

> Deployment serverless del Gestor de Productos con funciones automáticas, variables de entorno y monitoreo

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Configuración Inicial](#️-configuración-inicial)
- [Deploy Automático](#-deploy-automático-recomendado)
- [Deploy Manual](#-deploy-manual-cli)
- [Variables de Entorno](#-variables-de-entorno)
- [Estructura Serverless](#-estructura-serverless)
- [Testing](#-testing)
- [Monitoreo](#-monitoreo)
- [Troubleshooting](#-troubleshooting)

---

## ✅ Requisitos Previos

- ✅ Cuenta en [Vercel](https://vercel.com) (gratuita)
- ✅ Repositorio en GitHub con el proyecto
- ✅ Node.js v18+ instalado localmente
- ✅ Vercel CLI instalada (opcional para deploy manual)

---

## ⚙️ Configuración Inicial

### 1. Conectar Repositorio a Vercel

#### Opción A: Dashboard (Recomendado)

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en **"Add New..."** → **"Project"**
3. Selecciona tu repositorio `gestor-productos` de GitHub
4. Vercel detectará automáticamente que es un proyecto Node.js

#### Opción B: CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
cd gestor-productos
vercel link
```

### 2. Configurar Build Settings

Vercel detecta automáticamente:
- **Framework Preset:** None (Node.js puro)
- **Build Command:** `npm install` (o déjalo vacío)
- **Output Directory:** Ninguno (serverless functions)
- **Install Command:** `npm install`

No necesitas cambiar nada.

---

## 🔐 Variables de Entorno

### Variables Requeridas

Debes configurar estas variables en Vercel para **Production**, **Preview** y **Development**:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `JWT_SECRET` | Clave secreta para JWT (mín 32 caracteres) | `mi_super_secret_key_12345...` |
| `FIREBASE_KEY_BASE64` | Credenciales Firebase en base64 | `ew0KICAidHlwZSI6ICJzZXJ2aWNl...` |

### Configurar Variables - Dashboard

1. Ve a tu proyecto en Vercel → **Settings** → **Environment Variables**
2. Para cada variable:
   - **Key:** Nombre de la variable (ej: `JWT_SECRET`)
   - **Value:** Valor de la variable
   - **Environments:** Selecciona **Production**, **Preview**, **Development**
   - **Sensitive:** ✅ Marca como sensible
3. Click **Save**

### Configurar Variables - CLI

#### JWT_SECRET

```bash
# Añadir JWT_SECRET
echo "tu_clave_secreta_muy_segura_cambiar_en_produccion_12345" | vercel env add JWT_SECRET production

# Si ya existe, primero remover:
vercel env rm JWT_SECRET --yes
echo "tu_nueva_clave" | vercel env add JWT_SECRET production
```

#### FIREBASE_KEY_BASE64

```bash
# Generar base64 desde firebaseKey.json
$json = Get-Content -Raw "src/config/firebaseKey.json"
$base64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($json))
Write-Output $base64

# Añadir a Vercel (pega el valor cuando lo pida)
vercel env add FIREBASE_KEY_BASE64 production
```

### Verificar Variables

```bash
# Listar variables configuradas
vercel env ls
```

Deberías ver:
```
name                    value         environments
JWT_SECRET              Encrypted     Production, Preview, Development
FIREBASE_KEY_BASE64     Encrypted     Production
```

---

## 🌐 Deploy Automático (Recomendado)

Una vez conectado el repositorio, Vercel despliega automáticamente:

### Push a main → Production

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

- Vercel detecta el push
- Crea un deployment de **Production**
- URL: `https://gestor-productos-[hash].vercel.app`
- Tiempo estimado: ~20-30 segundos

### Pull Request → Preview

Cada PR genera un deployment de **Preview** con URL única:
- Útil para testing antes de merge
- URL: `https://gestor-productos-[hash]-[pr].vercel.app`

### Commits a otras ramas → Preview

Cualquier push a ramas no-main genera **Preview Deployments**.

---

## 🖥️ Deploy Manual (CLI)

### Deploy a Production

```bash
cd gestor-productos
vercel --prod
```

Output esperado:
```
Vercel CLI 49.1.1
🔍  Inspect: https://vercel.com/.../deployments/...
✅  Production: https://gestor-productos-xyz.vercel.app [20s]
```

### Deploy a Preview

```bash
vercel
```

Genera un deployment de preview sin afectar production.

### Deploy con Confirmación

```bash
vercel --prod --yes
```

Salta todas las preguntas de confirmación.

---

## 📁 Estructura Serverless

### Configuración: vercel.json

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/api" }
  ]
}
```

**Explicación:**
- `rewrites`: Redirige todas las rutas a `/api`
- Vercel detecta automáticamente `api/index.js` como función serverless
- No necesitas `builds` ni `routes` en la configuración moderna

### Entry Point: api/index.js

```javascript
import app from '../src/app.js';

// Vercel envuelve automáticamente Express como función serverless
export default app;
```

### Archivos Ignorados: .vercelignore

```
node_modules
.git
.env
.env.local
tests
docs
*.md
!README.md
```

---

## 🧪 Testing

### 1. Test Local con Vercel Dev

Simula el entorno serverless localmente:

```bash
vercel dev
```

- Corre en `http://localhost:3000`
- Usa las variables de `Development`
- Simula el comportamiento de production

### 2. Test de Deployment

Después del deploy, prueba los endpoints:

```bash
# Obtener URL del último deployment
vercel list --prod | head -3

# Test básico
curl https://gestor-productos-xyz.vercel.app/products

# Test completo con login
TOKEN=$(curl -s -X POST https://gestor-productos-xyz.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}' \
  | jq -r '.token')

echo "Token: $TOKEN"

curl https://gestor-productos-xyz.vercel.app/products/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99,"stock":10}'
```

### 3. Test con Postman

1. Importa `postman/gestor-productos.postman_collection.json`
2. Cambia la variable `base_url` a tu URL de Vercel
3. Ejecuta `Auth - Login` para obtener token
4. Prueba los demás endpoints

---

## 📊 Monitoreo

### Dashboard de Vercel

Accede desde: `https://vercel.com/[tu-usuario]/gestor-productos`

#### Pestaña Deployments
- Ver historial de deployments
- Estado (Building, Ready, Error)
- Duración del build
- Commits asociados

#### Pestaña Functions
- **Runtime Logs:** Logs en tiempo real de las funciones
- **Invocations:** Número de ejecuciones
- **Duration:** Tiempo de respuesta promedio
- **Errors:** Errores y stack traces

### Ver Logs en Tiempo Real

```bash
# Logs de production
vercel logs

# Logs de un deployment específico
vercel logs [deployment-url]

# Stream continuo
vercel logs --follow
```

### Analytics

En Dashboard → Analytics:
- Requests por segundo
- Latencia promedio
- Códigos de estado HTTP
- Top routes

---

## 🐛 Troubleshooting

### Error: FUNCTION_INVOCATION_FAILED

**Problema:** La función serverless falló al ejecutarse.

**Solución:**
1. Ve a Dashboard → Functions → Runtime Logs
2. Busca el error específico (ej: `Cannot find module`, `Firebase error`)
3. Verifica que las variables de entorno estén configuradas:
   ```bash
   vercel env ls
   ```
4. Si falta `FIREBASE_KEY_BASE64` o `JWT_SECRET`, agrégalas

### Error: No Output Directory named "public"

**Problema:** Vercel espera un directorio de salida.

**Solución:**
Verifica que `vercel.json` use `rewrites` en lugar de `builds`:
```json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/api" }
  ]
}
```

### Error 500: Internal Server Error

**Causas comunes:**
1. **Firebase no inicializado:**
   - Verifica `FIREBASE_KEY_BASE64` en variables de entorno
   - Revisa logs: `vercel logs`

2. **JWT_SECRET faltante:**
   - Añade la variable en Settings → Environment Variables

3. **Import/Export issues:**
   - Verifica que todos los archivos usen ES modules (`import/export`)
   - Chequea `package.json`: `"type": "module"`

### Error 401: Unauthorized en Vercel

**Problema:** Deployment Protection activada.

**Solución:**
1. Ve a Settings → **Deployment Protection**
2. Desactiva "Standard Protection" o "Vercel Authentication"
3. Redeploy: `vercel --prod`

### Variables de Entorno No Funcionan

**Síntomas:** `process.env.JWT_SECRET` es `undefined`

**Solución:**
1. Verifica que la variable esté en el ambiente correcto:
   - Dashboard → Settings → Environment Variables
   - Asegúrate de marcar "Production"
2. Redeploy después de añadir variables:
   ```bash
   vercel --prod
   ```
3. No uses `dotenv` en `api/index.js` (Vercel inyecta variables automáticamente)

### Build Tarda Mucho

**Optimizaciones:**
1. Añade `.vercelignore` para excluir archivos innecesarios
2. Usa `npm ci` en lugar de `npm install` (más rápido):
   - No configurable en Vercel, pero se puede forzar eliminando `package-lock.json` temporalmente

---

## 🔄 Rollback y Redeploy

### Rollback a Versión Anterior

1. Dashboard → Deployments
2. Encuentra el deployment funcional
3. Click en **⋮** → **Promote to Production**

### Redeploy Sin Cambios

```bash
# Mismo código, nuevo deployment
vercel --prod --force
```

Útil para:
- Aplicar cambios de variables de entorno
- Resolver errores transitorios
- Actualizar dependencias

---

## 🔗 Dominio Personalizado

### Añadir Dominio

1. Dashboard → Settings → **Domains**
2. Click **Add**
3. Ingresa tu dominio (ej: `api.midominio.com`)
4. Sigue las instrucciones de DNS:
   - Tipo: `CNAME`
   - Name: `api` (o `@` para root)
   - Value: `cname.vercel-dns.com`
5. Espera propagación DNS (~5-30 minutos)

### Certificado SSL

Vercel genera automáticamente certificados SSL gratuitos con Let's Encrypt.

---

## 📈 Límites del Plan Gratuito

| Recurso | Límite Free | Límite Pro |
|---------|-------------|------------|
| Bandwidth | 100 GB/mes | 1 TB/mes |
| Invocations | 100K/mes | 1M/mes |
| Build time | 100h/mes | 400h/mes |
| Deployments | Ilimitados | Ilimitados |

---

## 🎯 Mejores Prácticas

1. **Variables de Entorno:**
   - Usa `FIREBASE_KEY_BASE64` en lugar de archivos
   - Nunca comitees `.env` o credenciales

2. **Deployments:**
   - Usa deployments automáticos desde GitHub
   - Testea en Preview antes de merge a `main`

3. **Monitoreo:**
   - Revisa logs regularmente
   - Configura alerts para errores 500

4. **Performance:**
   - Mantén funciones serverless ligeras
   - Usa Firebase caching cuando sea posible

---

## 📞 Soporte

- **Documentación Oficial:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Issues del Proyecto:** [GitHub Issues](https://github.com/bernardocamera/gestor-productos/issues)

---

**Última actualización:** Diciembre 2025

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
