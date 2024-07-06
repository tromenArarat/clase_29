// src/controllers/movieController.js

/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllMovies
 * .getMovieById
 * .createMovie
 * .updateMovie
 * .deleteMovie
 */

//1- Importamos el módulo propio db
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.
const db = require('../db/db');

//2- Método para obtener todas las peliculas
const getAllMovies = (req, res) => {
    // Creamos una consulta
    const sql = 'SELECT * FROM movies';

    // Utilizamos .query para enviar la consulra a la bbdd
    // Primer parametro la consulta, segundo una función callback
    db.query(sql, (err, results) => {
        //si sucede algun error
        if (err) {console.log(err);
            return;} 
        //enviamos el resultado en formato json
        res.json(results);
    });
};

//3- Método para obtener peliculas con consultas parametrizadas
const getMovieById = (req, res) => {
    // Tomamos la solicitud y extraemos su id
    // Esta es una notacion de desestructuración {id}
    // en la req viaja /movies/1, la expresion {id} estrae el nro 1 de la ruta
    // y la almacena dentro de la variable id
    const { id } = req.params;

    // Creamos la consulta con marcador de posición
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // Los marcadores de posición se utilizan para evitar la inyección de SQL, 
    // ya que los valores se escapan automáticamente.

    // Interactuamos con la bbdd, pasamos la consulta anterior
    db.query(sql, [id], (err, result) => {
        //en caso de error
        if (err) {console.log(err);
            return;} 
        //enviamos en formato json
        res.json(result);
    });
};

//4- Método para crear una película
const createMovie = (req, res) => {
    // Desestructuramos la request
    const { title, director, year } = req.body;
    // Creamos la consulta con marcadores de posición
    const sql = 'INSERT INTO movies (title, director, year) VALUES (?, ?, ?)';
    // Pasamos la consulta
    //.query(consulta, array_con_valores, funcion_callback)
    db.query(sql, [title, director, year], (err, result) => {
        //en caso de error
        if (err)  {console.log(err);
            return;} 
        //enviamos mensaje de exito con info de la peli
        res.json({ message: 'Película creada', movieId: result.insertId });
    });
};

//5- Método para modificar una película (COMPLETAR)
const updateMovie = (req,res)=>{
    // Desestructuramos la petición
    // Evita hace const id = req.params.id
    const {id}=req.params;
    const {title,director,year}=req.body;
    // Consulta SQL con marcadores de posición
    const sql = 'UPDATE movies SET title = ?, director = ?, year = ? WHERE id = ?';
    // Pasamos la consulta
    db.query(sql,[title, director, year], (err, result) => {
        //en caso de error
        if (err)  {console.log(err);
        return;} 
        //enviamos mensaje de exito con info de la peli
        res.json({ message: 'Película actualizada' });
    });

}

//6- Método para borrar una película(COMPLETAR)
const deleteMovie = (req,res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM movies WHERE id = ?';
    db.query(sql,[id], (err, result) => {
        //en caso de error
        if (err)  {console.log(err);
        return;} 
        //enviamos mensaje de exito con info de la peli
        res.json({ message: 'Película borrada' });
    });
}
//7- Exportamos los módulos que serán utilizados en moviesRouter.js
module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};

//8- Pasamos a configurar db.js