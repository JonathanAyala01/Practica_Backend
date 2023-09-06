const express = require('express');
const app = express();
app.use(express);
app.use(express.urlencoded({ extended: true }))

const UsuarioModel = require('../Model/usuarioModel');

const usuarioController = {
  getAllUsuarios: (req, res) => {
    UsuarioModel.getAll((err, usuarios) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
      } else {
        res.status(200).json(usuarios);
      }
    });
  },

  getUsuarioByEmail: (req, res) => {
    const email = req.params.email;
    UsuarioModel.getByEmail(email, (err, usuario) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener usuario por email' });
      } else {
        if (usuario) {
          res.status(200).json(usuario);
        } else {
          res.status(404).json({ message: 'Usuario no encontrado' });
        }
      }
    });
  },

  createUsuario: (req, res) => {
    const { mail, nickname, password } = req.body;
    UsuarioModel.create({ mail, nickname, password }, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al crear usuario' });
      } else {
        res.status(201).json({ message: 'Usuario creado exitosamente' });
      }
    });
  },

  updateUsuario: (req, res) => {
    const email = req.params.email;
    const { nickname, password } = req.body;
    UsuarioModel.update(email, { nickname, password }, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      }
    });
  },

  deleteUsuario: (req, res) => {
    const email = req.params.email;
    UsuarioModel.delete(email, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
      } else {
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
      }
    });
  },
};

module.exports = usuarioController;
