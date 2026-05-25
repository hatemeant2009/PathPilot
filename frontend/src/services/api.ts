import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request Interceptor: Add token to headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await apiClient.post('/auth/refresh');
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication Service
export const authService = {
  signup: (email: string, password: string, firstName: string, lastName: string): Promise<AxiosResponse> =>
    apiClient.post('/auth/signup', { email, password, firstName, lastName }),
  
  login: (email: string, password: string): Promise<AxiosResponse> =>
    apiClient.post('/auth/login', { email, password }),
  
  verifyToken: (token: string): Promise<AxiosResponse> =>
    apiClient.post('/auth/verify', {}, { headers: { Authorization: `Bearer ${token}` } }),
  
  refresh: (): Promise<AxiosResponse> =>
    apiClient.post('/auth/refresh'),
  
  logout: (): Promise<AxiosResponse> =>
    apiClient.post('/auth/logout')
};

// Quiz Service
export const quizService = {
  getQuestions: (): Promise<AxiosResponse> =>
    apiClient.get('/quiz/questions'),
  
  submitQuiz: (userId: string, answers: string[]): Promise<AxiosResponse> =>
    apiClient.post('/quiz/submit', { userId, answers })
};

// Dashboard Service
export const dashboardService = {
  getDashboard: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/dashboard/${userId}`),
  
  getTasks: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/dashboard/${userId}/tasks`),
  
  completeTask: (taskId: string): Promise<AxiosResponse> =>
    apiClient.put(`/dashboard/tasks/${taskId}/complete`, {}),
  
  getProgress: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/dashboard/${userId}/progress`),
  
  updateProfile: (userId: string, data: any): Promise<AxiosResponse> =>
    apiClient.put(`/dashboard/${userId}/profile`, data)
};

// Recommendation Service
export const recommendationService = {
  getRecommendations: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/recommendations/${userId}`),
  
  getCareerPaths: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/recommendations/${userId}/career-paths`),
  
  getSkills: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/recommendations/${userId}/skills`),
  
  getRoadmap: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/recommendations/${userId}/roadmap`),
  
  getResources: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/recommendations/${userId}/resources`)
};

// Subscription Service
export const subscriptionService = {
  getPlans: (): Promise<AxiosResponse> =>
    apiClient.get('/subscription/plans'),
  
  getStatus: (userId: string): Promise<AxiosResponse> =>
    apiClient.get(`/subscription/status/${userId}`),
  
  upgrade: (userId: string, planName: string): Promise<AxiosResponse> =>
    apiClient.post('/subscription/upgrade', { userId, planName }),
  
  downgrade: (userId: string): Promise<AxiosResponse> =>
    apiClient.post('/subscription/downgrade', { userId }),
  
  cancel: (userId: string): Promise<AxiosResponse> =>
    apiClient.post('/subscription/cancel', { userId })
};

export default apiClient;
