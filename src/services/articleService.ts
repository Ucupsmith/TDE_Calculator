import axios, { InternalAxiosRequestConfig } from 'axios';

// Use environment variable for API URL with fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/user/v1/articles`
  : 'http://localhost:8000/user/v1/articles';

// Helper function to get full image URL
export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) return '/default-article.jpg';
  // If the image path is already a full URL, return it
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, prepend the backend URL
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${imagePath}`;
};

// Configure axios instance with timeout
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Add request interceptor for logging and token handling
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const url = config.baseURL && config.url ? `${config.baseURL}${config.url}` : 'unknown URL';
      console.log('Making request to:', url);
      
      // Get token from localStorage if available
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }
    
    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject(new Error('Network error. Please check your internet connection.'));
    }

    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';

    switch (status) {
      case 401:
        // Handle unauthorized
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        return Promise.reject(new Error('Session expired. Please login again.'));
      case 403:
        return Promise.reject(new Error('Access denied.'));
      case 404:
        return Promise.reject(new Error('Article not found.'));
      case 500:
        return Promise.reject(new Error('Server error. Please try again later.'));
      default:
        return Promise.reject(new Error(message));
    }
  }
);

export interface Article {
  id: number;
  title: string;
  content: string;
  imagePath: string | null;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  author?: {
    id: number;
    name: string;
    profileImage?: string;
  };
}

export interface CreateArticleDTO {
  title: string;
  content: string;
  authorId: number;
  imagePath?: string | null;
}

export interface UpdateArticleDTO {
  title?: string;
  content?: string;
  imagePath?: string;
}

// Get all articles
export const getArticles = async (page = 1, limit = 8): Promise<{ data: Article[]; total: number }> => {
  try {
    const response = await api.get(`/?page=${page}&limit=${limit}`);
    // Transform the response to match our Article interface
    const transformArticle = (article: any): Article => ({
      id: article.article_id ?? article.id ?? article.articleId,
      title: article.title,
      content: article.content,
      imagePath: article.image_path ?? article.imagePath,
      authorId: article.author_id ?? article.authorId,
      createdAt: article.created_at ?? article.createdAt,
      updatedAt: article.updated_at ?? article.updatedAt,
      likes: article.likes ?? 0,
      views: article.views ?? 0,
      author: article.author ? {
        id: article.author.adminId ?? article.author.id,
        name: article.author.admin_name ?? article.author.name,
        profileImage: article.author.profile_image ?? article.author.profileImage
      } : undefined
    });

    // Adapt to various backend response shapes
    if (Array.isArray(response.data)) {
      return { 
        data: response.data.map(transformArticle), 
        total: response.data.length 
      };
    }
    if (response.data && Array.isArray(response.data.articles)) {
      return {
        data: response.data.articles.map(transformArticle),
        total: response.data.total || response.data.articles.length
      };
    }
    if (response.data && Array.isArray(response.data.data)) {
      return {
        data: response.data.data.map(transformArticle),
        total: response.data.total || response.data.data.length
      };
    }
    return { data: [], total: 0 };
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get article by ID
export const getArticleById = async (id: number): Promise<Article> => {
  try {
    const response = await api.get(`/${id}`);
    const article = response.data;
    return {
      id: article.article_id,
      title: article.title,
      content: article.content,
      imagePath: article.image_path,
      authorId: article.author_id,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      likes: article.likes,
      views: article.views,
      author: article.author ? {
        id: article.author.adminId ?? article.author.id,
        name: article.author.admin_name ?? article.author.name,
        profileImage: article.author.profile_image ?? article.author.profileImage
      } : undefined
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Create new article
export const createArticle = async (data: FormData | CreateArticleDTO): Promise<Article> => {
  try {
    let formData: FormData;
    
    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('authorId', data.authorId.toString());
      if (data.imagePath) {
        formData.append('image', data.imagePath);
      }
    }

    const response = await api.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const article = response.data;
    return {
      id: article.article_id,
      title: article.title,
      content: article.content,
      imagePath: article.image_path,
      authorId: article.author_id,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      likes: article.likes,
      views: article.views,
      author: article.author ? {
        id: article.author.adminId ?? article.author.id,
        name: article.author.admin_name ?? article.author.name,
        profileImage: article.author.profile_image ?? article.author.profileImage
      } : undefined
    };
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id: number, articleData: UpdateArticleDTO): Promise<Article> => {
  try {
    const formData = new FormData();
    if (articleData.title) formData.append('title', articleData.title);
    if (articleData.content) formData.append('content', articleData.content);
    if (articleData.imagePath) formData.append('image', articleData.imagePath);

    const response = await api.put(`/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const article = response.data;
    return {
      id: article.article_id,
      title: article.title,
      content: article.content,
      imagePath: article.image_path,
      authorId: article.author_id,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      likes: article.likes,
      views: article.views,
      author: article.author ? {
        id: article.author.adminId ?? article.author.id,
        name: article.author.admin_name ?? article.author.name,
        profileImage: article.author.profile_image ?? article.author.profileImage
      } : undefined
    };
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
};

// Like article
export const likeArticle = async (id: number): Promise<Article> => {
  try {
    const response = await api.post(`/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking article:', error);
    throw error;
  }
}; 