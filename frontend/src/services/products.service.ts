import axios from 'axios';
import { getAuth } from './auth.service';

const API_URL = 'http://localhost:8000/api/products/';

export interface Product {
  id: number;
  code: string;
  name: string;
  characteristics: string;
  price_usd: number;
  price_eur: number;
  price_cop: number;
  company: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  code: string;
  name: string;
  characteristics: string;
  price_usd: number;
  price_eur: number;
  price_cop: number;
  company: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const auth = getAuth();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const createProduct = async (data: CreateProductData): Promise<Product> => {
  const auth = getAuth();
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const updateProduct = async (id: number, data: CreateProductData): Promise<Product> => {
  const auth = getAuth();
  const response = await axios.put(`${API_URL}${id}/`, data, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const auth = getAuth();
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
}; 