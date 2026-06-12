const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Página principal
app.get('/', (req, res) => {
  res.send(`
    <h1>Inventario Backend</h1>
    <p>Servidor funcionando correctamente 🚀</p>
    <p>MongoDB Atlas conectado ✅</p>
  `);
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Esquema de productos
const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  existencia: Number
});

const Producto = mongoose.model('Producto', ProductoSchema);

// Obtener productos
app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// Registrar producto
app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();

  res.json({
    mensaje: "Producto registrado",
    nuevoProducto
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});