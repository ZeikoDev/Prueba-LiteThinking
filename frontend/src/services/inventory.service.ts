import axios from 'axios';
import { getAuth } from './auth.service';

const API_URL = 'http://localhost:8000/api/inventory/';

export interface Inventory {
  id: number;
  product: number;
  company: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CreateInventoryData {
  product: number;
  company: number;
  quantity: number;
}

export const getInventory = async (): Promise<Inventory[]> => {
  const auth = getAuth();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const createInventory = async (data: CreateInventoryData): Promise<Inventory> => {
  const auth = getAuth();
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const updateInventory = async (id: number, data: CreateInventoryData): Promise<Inventory> => {
  const auth = getAuth();
  const response = await axios.put(`${API_URL}${id}/`, data, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const deleteInventory = async (id: number): Promise<void> => {
  const auth = getAuth();
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
}; 