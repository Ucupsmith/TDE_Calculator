import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  adminId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        adminId: number;
      };
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    // Verify admin exists
    const admin = await prisma.admin.findUnique({
      where: { adminId: decoded.adminId }
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = { adminId: decoded.adminId };
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}; 