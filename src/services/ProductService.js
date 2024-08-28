import axiosInstance from './axiosConfig';

class ProductService {
  // Método para obtener la lista de todos los productos
  async getAllProducts() {
    try {
      const response = await axiosInstance.get('/products', {headers: {
        'Content-Type': 'application/json'
    }});
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
  }


  async save(product) {
    try {
      const response = await axiosInstance.post('/products', product, {headers: {
        'Content-Type': 'application/json'
      }});
      return response.data;
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  async update(id, product) {
    try {
      const response = await axiosInstance.put(`/products/${id}`, product, {headers: {
        'Content-Type': 'application/json'
      }});
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await axiosInstance.delete(`/products/${id}`, {headers: {
        'Content-Type': 'application/json'
      }});
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

}

export default new ProductService();
