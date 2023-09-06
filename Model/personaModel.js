const mysql = require('mysql');
const db = require('../db'); 

const express = require('express');
const app = express();
app.use(express);
app.use(express.urlencoded({ extended: true }));

const PersonaModel = {
  getAll(callback) {
    db.query('SELECT * FROM persona', (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getByDni(dni, callback) {
    db.query('SELECT * FROM persona WHERE dni = ?', [dni], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        if (results.length > 0) {
          callback(null, results[0]);
        } else {
          callback(null, null); 
        }
      }
    });
  },

  create({ dni, nombre, apellido, }, callback) {
    const nuevaPersona = {
      dni: dni,
      nombre: nombre,
      apellido: apellido
    };

    db.query('INSERT INTO persona SET ?', nuevaPersona, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  update(dni, { nombre, apellido }, callback) {
    db.query(
      'UPDATE persona SET nombre = ?, apellido = ? WHERE dni = ?',
      [nombre, apellido, dni],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },

  delete(dni, callback) {
    db.query('DELETE FROM persona WHERE dni = ?', [dni], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = PersonaModel;
