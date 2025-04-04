// backend/index.js
const express = require('express');
const cors = require('cors'); // importante para desarrollo local
const app = express();
const port = 3000;

app.use(cors()); // permitir peticiones desde otro origen (como Vue)
app.use(express.json());

// Ruta simple que devuelve un mensaje
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hola desde el backend!' });
});

app.listen(port, () => {
    console.log(`Servidor backend en http://localhost:${port}`);
});
