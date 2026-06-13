const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conexión exitosa"))
  .catch(err => console.error("❌ Error:", err));

const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  precio: Number,
  existencia: Number
}));

// Rutas
app.get('/api/productos', async (req, res) => res.json(await Producto.find()));

app.post('/api/productos', async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// NUEVA RUTA PARA ACTUALIZAR
app.put('/api/productos/:id', async (req, res) => {
  await Producto.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

app.delete('/api/productos/:id', async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));