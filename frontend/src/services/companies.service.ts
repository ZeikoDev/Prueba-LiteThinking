import axios from 'axios';
import { getAuth } from './auth.service';

const API_URL = 'http://localhost:8000/api/companies/';

export interface Company {
  id: number;
  nit: string;
  name: string;
  address: string;
  phone: string;
  user: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyData {
  nit: string;
  name: string;
  address: string;
  phone: string;
}

export const getCompanies = async (): Promise<Company[]> => {
  const auth = getAuth();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const createCompany = async (data: CreateCompanyData): Promise<Company> => {
  const auth = getAuth();
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const updateCompany = async (id: number, data: CreateCompanyData): Promise<Company> => {
  const auth = getAuth();
  const response = await axios.put(`${API_URL}${id}/`, data, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
  return response.data;
};

export const deleteCompany = async (id: number): Promise<void> => {
  const auth = getAuth();
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: auth ? `Bearer ${auth.access}` : '',
    },
  });
}; 