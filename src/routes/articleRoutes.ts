import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  getAllArticles, 
  getArticleById, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  likeArticle 
} from '../controllers/articleController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'images', 'articleImages'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/:id/like', likeArticle);

// Protected routes (require authentication)
router.post('/', authenticateToken, upload.single('image'), createArticle);
router.put('/:id', authenticateToken, upload.single('image'), updateArticle);
router.delete('/:id', authenticateToken, deleteArticle);

export default router; 