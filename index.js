// src/server.js
/**
 * Punto principal de acceso al servidor
 */

//1- Importamos express
const express = require('express');

const cors = require("cors");



const authRoutes = require('./routes/authRoutes.js');

const dotenv = require('dotenv');

dotenv.config();

//console.log(process.env)

//2- Instanciamos express
const app = express();


// Activamos cors
app.use(cors())

//3- Importamos el módulo movieRoutes (se lo diseñará a futuro)
const movieRoutes = require('./routes/moviesRouter');

//4- Declaramos el puerto
const PORT = process.env.PORT||3000; 



//5- Uso del middleware .json que convierte el cuerpo de solicitud
// en algo accesible por js
app.use(express.json());

//6- Prefijo principal de las rutas y delegación de las sub-rutas
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);

//7- Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

//8- Pasamos a configurar el router
