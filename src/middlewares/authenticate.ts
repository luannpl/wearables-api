import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { DecodedToken } from '../types/jwt';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({ error: 'Token not provided' });
        return 
    }

    const [type, token] = authHeader.split(' ');
    if(type !== 'Bearer' || !token){
        res.status(401).json({ error: 'Invalid token format' });
        return;
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
          });
      
          if (!user) {
            res.status(401).json({ error: 'User no longer exists' });
            return;
          }
        req.user = decoded; 
        next();
    }
    catch (error: any) {
        if (error.name === 'TokenExpiredError') {
          res.status(401).json({ error: 'Expired token' });
          return;
        }
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
}