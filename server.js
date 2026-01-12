import https from 'https';
import fs from 'fs';
import express from 'express';

const app = express();
app.use(express.static('.'));

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(8080, () => {
  console.log('HTTPS server running on https://localhost:8080');
});
