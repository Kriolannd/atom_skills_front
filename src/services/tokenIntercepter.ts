import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import type { AxiosInstance } from 'axios';

interface DecodedToken {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  const decodedToken: DecodedToken = jwtDecode(token);
  const exp: number = decodedToken.exp;
  const now: number = Math.floor(Date.now() / 1000);
  return exp <= now;
};

const refreshToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem('token');
    if (!refreshToken) {
      throw new Error('Token is not available');
    }
  
    try {
      const response = await axios.post('/api/auth/refresh', {
        refreshToken
      });
  
      if (response.status === 200) {
        return response.data.token;
      } else {
        throw new Error('Refresh token failed');
      }
  
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
};

const setupInterceptor = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token && isTokenExpired(token)) {
        return new Promise((resolve, reject) => {
          refreshToken()
            .then((newToken) => {
              localStorage.setItem('token', newToken);
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(config);
            })
            .catch((error) => reject(error));
        });
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const axiosInstance: AxiosInstance = setupInterceptor(axios);

export default axiosInstance;
