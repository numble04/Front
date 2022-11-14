import axios from 'axios';
import Router from 'next/router';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api`,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config: originalRequest } = error;
    console.error('[RESPONSE ERROR]', error);

    // HINT: 401 에러 처리
    if (response && !originalRequest._retry && response.status === 401) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const res = await api.get(`/auth/reissue`, {
            params: { refreshToken },
            headers: {
              Authorization: '',
            },
          });

          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          localStorage.setItem('refreshToekn', res.data.refreshToekn);
          return api(originalRequest);
        } catch (error) {
          Router.replace(`/login`);
          localStorage.clear();
          Promise.reject(error);
        }
      } else {
        Router.replace(`/login`);
        localStorage.clear();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
