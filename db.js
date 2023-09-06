const mysql = require('mysql');

// Crear la conexión a la base de datos
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Club2o1e',
    database: 'backend'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});



module.exports = db;