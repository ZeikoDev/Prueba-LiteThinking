import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface AuthResponse {
  access: string;
  refresh: string;
  username?: string;
  role?: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/token/`, { username, password });
  return response.data;
};

export const saveAuth = (data: AuthResponse) => {
  localStorage.setItem('auth', JSON.stringify(data));
};

export const getAuth = (): AuthResponse | null => {
  const data = localStorage.getItem('auth');
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem('auth');
};
 