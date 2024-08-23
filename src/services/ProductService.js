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
}

export default new ProductService();
