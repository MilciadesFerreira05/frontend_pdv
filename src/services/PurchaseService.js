import axiosInstance from './axiosConfig';

class PurchaseService {
  // Método para obtener la lista de todas las compras con paginación
  async getAllPurchases({ page = 0, size = 10 }) {
    try {
      const response = await axiosInstance.get('/purchases', {
        params: { page, size }, // Parámetros de paginación
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error fetching purchases:', error);
      throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
  }

  async save(purchase) {
    try {
      const response = await axiosInstance.post('/purchases', purchase, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving purchase:', error);
      throw error;
    }
  }

  async update(id, purchase) {
    try {
      const response = await axiosInstance.put(`/purchases/${id}`, purchase, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating purchase:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await axiosInstance.delete(`/purchases/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error deleting purchase:', error);
      throw error;
    }
  }
}

export default new PurchaseService();
