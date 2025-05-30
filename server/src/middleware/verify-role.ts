import { Request, Response, NextFunction } from 'express';

export const verifyRole = (roles: string[]) => {    
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as { id: string; role: string };

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: 'You are not authorized to access this resource.' });
      return; // Burada return var ama tip `void` çünkü `res` üzerinden döndük.
    }

    next();
  };
};
