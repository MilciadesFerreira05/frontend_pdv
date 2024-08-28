import axiosInstance from './axiosConfig';

class CategoryService {
  // Método para obtener la lista de todas las categorías
  async getAllCategories() {
    try {
      const response = await axiosInstance.get('/categories', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
  }

  async save(category) {
    try {
      const response = await axiosInstance.post('/categories', category, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving category:', error);
      throw error;
    }
  }

  async update(id, category) {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, category, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}

export default new CategoryService();
