import axiosInstance from './axiosConfig';

export const fetchSuppliers = async () => {
    try {
        const response = await axiosInstance.get('/suppliers');
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const savePurchase = async (purchaseData) => {
    try {
        const response = await axiosInstance.post('/purchases', purchaseData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error saving purchase:', error);
        throw error;
    }
};
