require('dotenv/config');
const express = require('express');
const fs = require('fs');
//const http = require('http');
const https = require('https');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080

app.use(express.static(__dirname + '/dist/prod/cripto-lab-ng'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/prod/cripto-lab-ng/index.html')));

const server = http.createServer(app);
// const server = https.createServer({
//   key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.PRODUCT_URL}/privkey.pem`),
//   cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.PRODUCT_URL}/fullchain.pem`)
// }, 
// app)
// .listen(port);

server.listen(port,() => console.log('Funcionando'))