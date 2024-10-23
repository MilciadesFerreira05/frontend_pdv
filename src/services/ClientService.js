import axiosInstance from './axiosConfig';

class ClientService {
  // Método para obtener la lista de todos los clientes con paginación
  async getAllClients({ page = 0, size = 10, q = ""} = {}) {
    try {
      const response = await axiosInstance.get('/clients', {
        params: { page, size, q }, // Parámetros de paginación
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
  }

  // Método para guardar un nuevo cliente
  async save(client) {
    try {
      const response = await axiosInstance.post('/clients', client, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving client:', error);
      throw error;
    }
  }

  // Método para actualizar un cliente existente
  async update(id, client) {
    try {
      const response = await axiosInstance.put(`/clients/${id}`, client, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }

  // Método para eliminar un cliente
  async delete(id) {
    try {
      await axiosInstance.delete(`/clients/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }
}

export default new ClientService();
