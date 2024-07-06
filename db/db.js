/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

// 1 | Importamos el módulo mysql2
const mysql = require('mysql2');

require('dotenv').config();

// 2 | Configuramos la conexión
const connection = mysql.createConnection({
    host:process.env.HOST_DB,
    user:process.env.USER_DB,
    password:process.env.PASS_DB,
    port: process.env.PORT_DB
});

// 3 | Conectamos
connection.connect((err)=>{
    if(err){
        console.error("Error de conexión: "+err);
        return;
    }
    // Si todo va bien
    console.log("Estado de la conexión: CONECTADA");
    // Creamos una consulta verificando la bbdd y si no existe la creamos
    connection.query('CREATE DATABASE IF NOT EXISTS movies_db', (err,results)=>{
        if(err){
            console.error('Error creating database: ',err);
            return;
        }
        console.log('Base de datos asegurada');

        connection.changeUser({database: 'movies_db'},(err)=>{
            if(err){
                console.error('Error cambiando a movies_db:',err);
                return;
            }
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS movies (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    director VARCHAR(255) NOT NULL,
                    year INT NOT NULL
                    );
                `;
                connection.query(createTableQuery, (err,results)=>{
                    if(err){
                        console.error('Error creando tabla: ',err);
                        return;
                    }
                    console.log('Tabla asegurada');
                });
            });
        });
    });
module.exports = connection;
