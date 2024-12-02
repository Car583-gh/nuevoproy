const express = require('express');
const pool = require('./db'); //importa la conexion a la base de datos
const routes = require('./routes');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());
app.use('/', routes);


app.listen(3000, () => {
    console.log('Servidor ejecutandose en el puerto 3000');
});

