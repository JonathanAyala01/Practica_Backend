const mysql = require('mysql');
const db = require('../db'); 

const express = require('express');
const app = express();
app.use(express);
app.use(express.urlencoded({ extended: true }));

const UsuarioModel = {
  getAll(callback) {
    db.query('SELECT * FROM usuario', (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getByEmail(email, callback) {
    db.query('SELECT * FROM usuario WHERE mail = ?', [email], (err, results) => {
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

  create({ mail, nickname, password }, callback) {
    const nuevoUsuario = {
      mail: mail,
      nickname: nickname,
      password: password,
    };

    db.query('INSERT INTO usuario SET ?', nuevoUsuario, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  update(email, { nickname, password }, callback) {
    db.query(
      'UPDATE usuario SET nickname = ?, password = ? WHERE mail = ?',
      [nickname, password, email],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },

  delete(email, callback) {
    db.query('DELETE FROM usuario WHERE mail = ?', [email], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = UsuarioModel;
