const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async leerProductos(limit = null) {
    try {
      let data = await fs.readFile(this.path, "utf-8");

      if (!data.trim()) {
        console.log("El archivo está vacío.");
        return [];
      }

      let products = JSON.parse(data);
      if (limit) {
        return products.slice(0, limit);
      }
      return products;
    } catch (error) {
      console.log(error);
      throw new Error("Error al leer productos");
    }
  }

  async cargaProducto(title, description, price, thumbnail, code, stock) {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(data);

      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      products.push(newProduct);
      await fs.writeFile(this.path, JSON.stringify(products), "utf-8");
      console.log("Producto agregado con éxito.");
    } catch (error) {
      console.log(error);
      throw new Error("Error al cargar producto");
    }
  }

  async eliminarProducto(id) {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(data);

      let updatedProducts = products.filter(product => product.id !== id);

      await fs.writeFile(this.path, JSON.stringify(updatedProducts), "utf-8");
      console.log(`Producto con ID ${id} eliminado con éxito.`);
    } catch (error) {
      console.log("Error al eliminar producto:", error);
      throw new Error("Error al eliminar producto");
    }
  }

  async obtenerProducto(productId) {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(data);

      const product = products.find(product => product.id === productId);
      return product;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw new Error("Error al obtener el producto");
    }
  }
  
}



module.exports = ProductManager;