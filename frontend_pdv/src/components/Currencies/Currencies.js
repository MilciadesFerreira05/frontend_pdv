import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await api.get('/currencies');
      setCurrencies(response.data);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  return (
    <div>
      <h1>Monedas</h1>
      <ul>
        {currencies.map(currency => (
          <li key={currency.id}>{currency.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Currencies;
