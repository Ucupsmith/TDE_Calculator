import express, { Router } from 'express';
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
import { authenticateToken, isAdmin, isAuthor } from '../middleware/auth';

const router: Router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/articleImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
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
router.post('/:id/like', authenticateToken, likeArticle);

// Protected routes
router.post('/', authenticateToken, isAuthor, upload.single('image'), createArticle);
router.put('/:id', authenticateToken, isAuthor, upload.single('image'), updateArticle);
router.delete('/:id', authenticateToken, isAdmin, deleteArticle);

export default router; 