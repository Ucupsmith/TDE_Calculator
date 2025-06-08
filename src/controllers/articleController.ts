import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// Get all articles
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            adminId: true,
            name: true,
            profile_image: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get article by ID
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: {
        article_id: parseInt(id)
      },
      include: {
        author: {
          select: {
            adminId: true,
            name: true,
            profile_image: true
          }
        }
      }
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment views
    await prisma.article.update({
      where: { article_id: parseInt(id) },
      data: { views: { increment: 1 } }
    });

    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new article
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const author_id = req.user?.adminId; // Assuming you have authentication middleware

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const image_path = `/images/articleImages/${req.file.filename}`;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        category,
        image_path,
        author_id,
        status: 'Pending'
      },
      include: {
        author: {
          select: {
            adminId: true,
            name: true,
            profile_image: true
          }
        }
      }
    });

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update article
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category, status } = req.body;
    const author_id = req.user?.adminId;

    let image_path;
    if (req.file) {
      // Delete old image if exists
      const oldArticle = await prisma.article.findUnique({
        where: { article_id: parseInt(id) }
      });

      if (oldArticle?.image_path) {
        const oldImagePath = path.join(process.cwd(), 'public', oldArticle.image_path);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      image_path = `/images/articleImages/${req.file.filename}`;
    }

    const article = await prisma.article.update({
      where: { article_id: parseInt(id) },
      data: {
        title,
        content,
        category,
        status,
        ...(image_path && { image_path })
      },
      include: {
        author: {
          select: {
            adminId: true,
            name: true,
            profile_image: true
          }
        }
      }
    });

    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete article
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete image if exists
    const article = await prisma.article.findUnique({
      where: { article_id: parseInt(id) }
    });

    if (article?.image_path) {
      const imagePath = path.join(process.cwd(), 'public', article.image_path);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.article.delete({
      where: { article_id: parseInt(id) }
    });

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Like article
export const likeArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.update({
      where: { article_id: parseInt(id) },
      data: { likes: { increment: 1 } }
    });

    res.json(article);
  } catch (error) {
    console.error('Error liking article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 