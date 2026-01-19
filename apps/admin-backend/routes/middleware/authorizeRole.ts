import type { Request, Response, NextFunction } from "express";

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!req.user) {
      return res.status(401).json({ message: "Unauthenticated", Error: Error });
    }
    //@ts-ignore
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acces denied", Error: Error });
    }

    next();
  };
};
