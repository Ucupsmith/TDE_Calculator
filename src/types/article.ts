export interface Article {
  id: number;
  title: string;
  content: string;
  imagePath?: string | null;
  authorId: number;
  author?: {
    id: number;
    name: string;
    profileImage?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
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

export interface ArticleResponse {
  data: Article[];
  total: number;
}

export interface ArticleError {
  message: string;
  error?: string;
} 