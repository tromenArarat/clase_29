// src/routes/movieRoutes.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

const authMiddleware=require('../middlewares/authMiddleware.js');


// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio movieController (a realizarlo a futuro)
const movieController = require('../controllers/movieController');

// 4- En movieController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al movieController con el método específico para cada opción 

// Ruta de listado en general
router.get('/',authMiddleware, movieController.getAllMovies);
//Ruta para la consulta de peliculas por id
router.get('/:id', movieController.getMovieById);
//Ruta para crear una pelicula
router.post('/', movieController.createMovie);
//Ruta para actualizar una pelicula
router.put('/:id', movieController.updateMovie);
//Ruta para borrar una pelicula
router.delete('/:id', movieController.deleteMovie);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar movieController.js