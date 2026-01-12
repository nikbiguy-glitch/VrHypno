# Quest 3 WebXR MR Popup

A lightweight mixed-reality popup app using WebXR and passthrough.

## Run locally
1. Generate HTTPS cert:
   openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem

2. Install deps:
   npm install

3. Start server:
   npm start

4. Open in Quest Browser:
   https://YOUR_PC_IP:8080
