import express from 'express';
import { Request, Response, NextFunction } from 'express';

export function conditionalBodyParser(req: Request, res: Response, next: NextFunction) {
  const contentType = req.get('Content-Type');
  
  if (!contentType || !contentType.includes('multipart/form-data')) {
    express.json()(req, res, () => {
      express.urlencoded({ extended: true })(req, res, next);
    });
  } else {
    next();
  }
}
