const express = require('express');
//const myConnection = require('express-myconnection');
const app = express();
const bodyParser = require('body-parser');


// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Esto permite todas las solicitudes, puedes ajustarlo a tus necesidades.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./router'));

app.listen(3000, ()=>{
    console.log('Server Running in http://localhost:3000');
});
