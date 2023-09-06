const express = require('express');
const app = express();
app.use(express);
app.use(express.urlencoded({ extended: true }));

const Persona = require('../Model/personaModel');

const personaController = {
  getAllPersonas: (req, res) => {
    Persona.getAll((err, personas) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener personas' });
      } else {
        res.status(200).json(personas);
      }
    });
  },

  getPersonaByApellido: (req, res) => {
    const apellido = req.params.apellido;
    Persona.getByApellido(apellido, (err, persona) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener persona por apellido' });
      } else {
        if (persona) {
          res.status(200).json(persona);
        } else {
          res.status(404).json({ message: 'Persona no encontrada' });
        }
      }
    });
  },

  createPersona: (req, res) => {
    const { dni, nombre, apellido } = req.body;
    Persona.create({dni, nombre, apellido}, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al crear persona' });
      } else {
        res.status(201).json({ message: 'Persona creada exitosamente' });
      }
    });
  },

  updatePersona: (req, res) => {
    const dni = req.params.dni;
    const { nombre, apellido } = req.body;
    Persona.update(dni, nombre, apellido, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al actualizar persona' });
      } else {
        res.status(200).json({ message: 'Persona actualizada exitosamente' });
      }
    });
  },

  deletePersona: (req, res) => {
    const dni = req.params.dni;
    Persona.delete(dni, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar persona' });
      } else {
        res.status(200).json({ message: 'Persona eliminada exitosamente' });
      }
    });
  },
};

module.exports = personaController;
