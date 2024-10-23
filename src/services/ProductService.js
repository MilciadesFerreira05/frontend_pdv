import axiosInstance from './axiosConfig';

class ProductService {
  // Método para obtener la lista de todos los productos con paginación
  async getAllProducts({ page = 0, size = 10, q = ""}) {
    try {
      const response = await axiosInstance.get('/products', {
        params: { page, size, q }, // Parámetros de paginación
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
  }

  async searchProducts({ q = "", page = 0, size = 10, sort = "id", direction = "ASC" } = {}) {
    try {
      const response = await axiosInstance.get('/products/search', {
        params: { q, page, size, sort, direction },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async save(product) {
    try {
      const response = await axiosInstance.post('/products', product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  async update(id, product) {
    try {
      const response = await axiosInstance.put(`/products/${id}`, product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await axiosInstance.delete(`/products/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export default new ProductService();
