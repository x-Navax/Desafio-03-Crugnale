const express = require('express');
const app = express();
const ProductManager = require('./main.js');
const productManager = new ProductManager("./products.json");
const port = 8080

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      const products = await productManager.leerProductos(limit);
      res.json(products);
    } else {
      const products = await productManager.leerProductos();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ error: 'El ID no es valido' });
      }
  
      const product = await productManager.obtenerProducto(productId);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
  
      res.json(product);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

app.listen(port, () => {
  console.log('Server abierto en puerto 8080');
});