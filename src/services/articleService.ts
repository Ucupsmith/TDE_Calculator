import axios, { InternalAxiosRequestConfig } from 'axios';

// Update the API URL to match your backend server
const API_URL = 'http://localhost:8000/user/v1/articles';

// Helper function to get full image URL
export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) return '/default-article.jpg';
  // If the image path is already a full URL, return it
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, prepend the backend URL
  return `http://localhost:8000${imagePath}`;
};

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.baseURL && config.url ? `${config.baseURL}${config.url}` : 'unknown URL';
    console.log('Making request to:', url);
    console.log('Request config:', config);
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    console.error('Error config:', error.config);
    console.error('Error response:', error.response);
    return Promise.reject(error);
  }
);

export interface Article {
  article_id: number;
  title: string;
  content: string;
  image_path: string | null;
  category: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  status: 'Pending' | 'Published' | 'Rejected';
  views: number;
  likes: number;
  author?: {
    adminId: number;
    name: string;
    profile_image?: string;
  };
}

// Get all articles
export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get article by ID
export const getArticleById = async (id: number): Promise<Article> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Create new article
export const createArticle = async (articleData: FormData): Promise<Article> => {
  try {
    const response = await api.post('/', articleData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id: number, articleData: FormData): Promise<Article> => {
  try {
    const response = await api.put(`/${id}`, articleData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}; 