const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
morgan(':method :url :status :res[content-length] - :response-time ms');


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  }
});

const personaController = require('./Controller/personaController');
const usuarioController = require('./Controller/usuarioController');
// rutas personas

app.get('/personas', personaController.getAllPersonas);
app.get('/personas/:apellido', personaController.getPersonaByApellido);
app.post('/personas', personaController.createPersona);
app.put('/personas/:dni', personaController.updatePersona);
app.delete('/personas/:dni', personaController.deletePersona);

//rutas usuarios 

app.get('/usuarios', usuarioController.getAllUsuarios);
app.get('/usuarios/:email', usuarioController.getUsuarioByEmail);
app.post('/usuarios', usuarioController.createUsuario);
app.put('/usuarios/:email', usuarioController.updateUsuario);
app.delete('/usuarios/:email', usuarioController.deleteUsuario);