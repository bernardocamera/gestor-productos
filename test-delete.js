import http from 'http';
import jwt from 'jsonwebtoken';

// Generar token válido
const token = jwt.sign(
  { email: 'test@gmail.com' },
  'tu_clave_secreta_muy_segura_cambiar_en_produccion_12345',
  { expiresIn: '2h' }
);

console.log('Token generado:', token.substring(0, 20) + '...\n');

// Hacer DELETE a un ID inexistente con token
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/products/ID_INEXISTENTE_PRUEBA_123',
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
    if (res.statusCode !== 404) {
      console.log('\n❌ ERROR: Se esperaba 404, se recibió', res.statusCode);
    } else {
      console.log('\n✅ OK: Se recibió 404 como se esperaba');
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
