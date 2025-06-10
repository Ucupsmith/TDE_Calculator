import { Request, Response, NextFunction } from 'express';
import { Article, CreateArticleDTO, UpdateArticleDTO } from '../types/article';
import * as articleService from '../services/articleService';

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
  file?: Express.Multer.File;
}

// Get all articles
export const getAllArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const { data, total } = await articleService.getArticles(page, limit);
    res.json({ data, total });
  } catch (error) {
    next(error);
  }
};

// Get article by ID
export const getArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const articleId = parseInt(req.params.id);
    if (isNaN(articleId)) {
      res.status(400).json({ message: 'Invalid article ID' });
      return;
    }
    const article = await articleService.getArticleById(articleId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

// Create new article
export const createArticle = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    const articleData: CreateArticleDTO = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.user.id,
      imagePath: req.file ? `/images/articleImages/${req.file.filename}` : null
    };
    if (!articleData.title || !articleData.content) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    const article = await articleService.createArticle(articleData);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// Update article
export const updateArticle = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    const articleId = parseInt(req.params.id);
    if (isNaN(articleId)) {
      res.status(400).json({ message: 'Invalid article ID' });
      return;
    }
    // Check if user is the author or admin
    const article = await articleService.getArticleById(articleId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    if (article.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to update this article' });
      return;
    }
    const updateData: UpdateArticleDTO = {
      title: req.body.title,
      content: req.body.content,
      imagePath: req.file ? `/images/articleImages/${req.file.filename}` : undefined
    };
    const updatedArticle = await articleService.updateArticle(articleId, updateData);
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// Delete article
export const deleteArticle = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    const articleId = parseInt(req.params.id);
    if (isNaN(articleId)) {
      res.status(400).json({ message: 'Invalid article ID' });
      return;
    }
    // Check if user is the author or admin
    const article = await articleService.getArticleById(articleId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    if (article.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to delete this article' });
      return;
    }
    const success = await articleService.deleteArticle(articleId);
    if (!success) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Like article
export const likeArticle = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    const articleId = parseInt(req.params.id);
    if (isNaN(articleId)) {
      res.status(400).json({ message: 'Invalid article ID' });
      return;
    }
    const article = await articleService.likeArticle(articleId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
}; 